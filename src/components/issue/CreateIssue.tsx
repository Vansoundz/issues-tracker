import { useMutation, useQuery } from "@apollo/client";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CREATE_ISSUE } from "../../graphql/mutations";
import { SEARCH_REPO } from "../../graphql/queries";
import { Repo } from "../../models/repo.model";
import { RootState } from "../../store";
// import { RootState } from "../../store";
import Loading from "../layout/Loading";
import Modal, { IModal } from "../utils/Modal";

interface ILIssue {
  id: string;
  title: string;
  body?: string;
}

const CreateIssue: FC<IModal> = ({ close, open, refetch }) => {
  const [query, setQuery] = useState("");
  const [repositories, setrepositories] = useState<Repo[]>([]);
  const [repo, setRepo] = useState<Repo>();

  const { loading: searching } = useQuery(SEARCH_REPO, {
    variables: { query },
    onCompleted: (d) => {
      let r: Repo[] = [];
      for (let repo of d.search.edges) {
        r.push(repo.node);
      }
      setrepositories(r);
    },
  });

  const { user } = useSelector((state: RootState) => state.auth);

  const [issue, setIssue] = useState<ILIssue>({ id: "", title: "" });

  const [createIssue, { loading }] = useMutation(CREATE_ISSUE, {
    variables: { ...issue },
    onError: (error) => {
      toast(error.message, {
        type: "error",
        style: { color: "white" },
      });
    },
    onCompleted: (d) => {
      toast("Issue created successfully", {
        type: "success",
        style: { color: "white" },
      });
      close();
      setIssue({ title: "", id: "" });
      setRepo(undefined);
    },
  });

  return (
    <>
      {loading && <Loading />}
      <Modal open={open} close={close}>
        <div className="issue-header">
          <h4>Create Issue</h4>
        </div>
        <div className="comments">
          <div className="list">
            <div>
              <div>
                <label htmlFor="title">Title</label>
              </div>
              <input
                type="text"
                data-testid="title"
                value={issue.title}
                onChange={(e) =>
                  setIssue({
                    ...issue,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="add-comment">
              <div>
                <label>Description</label>
              </div>
              <textarea
                rows={4}
                data-testid="body"
                value={issue.body || ""}
                onChange={(e) =>
                  setIssue({
                    ...issue,
                    body: e.target.value,
                  })
                }
              ></textarea>
              <div
                style={{
                  padding: "16px 0",
                }}
              >
                <div>
                  <label>Search repo</label>
                </div>
                <input
                  type="text"
                  data-testid="search-repo"
                  onChange={(e) => {
                    setQuery(`user:${user?.login} ${e.target.value}`);
                  }}
                />
                <div>
                  {searching ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      <h4>Select repo</h4>
                      <div className="repos">
                        {repositories &&
                          repositories.map((repository) => {
                            let { name, id } = repository;
                            return (
                              <div
                                onClick={() => {
                                  setRepo(repository);
                                  setIssue({
                                    ...issue,
                                    id: id!,
                                  });
                                }}
                                className={`repo ${
                                  repo?.id === id ? "selected" : ""
                                }`}
                                key={id}
                              >
                                {name}
                              </div>
                            );
                          })}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <button
                  onClick={async (e) => {
                    await createIssue();
                    if (refetch) await refetch();
                  }}
                >
                  create Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateIssue;
