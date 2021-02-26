import { useMutation } from "@apollo/client";
import React, { FC, useEffect, useState } from "react";
import {
  ADD_COMMENT,
  CLOSE_ISSUE,
  DELETE_ISSUE,
  EDIT_ISSUE,
  REOPEN_ISSUE,
} from "../../graphql/mutations";
import { Issue } from "../../models/issue.model";
import { addLinks } from "../../utils";
import Loading from "../layout/Loading";
import Modal from "./Modal";

const EditIssue: FC<
  Issue & {
    refetch: () => void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = (props) => {
  const {
    refetch,
    id,
    closed,
    title,
    comments: { nodes: comments, totalCount },
  } = props;
  const [newTitle, setNewTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [edit, setEdit] = useState(false);

  const [addComment, { loading, data }] = useMutation(ADD_COMMENT, {
    variables: { id, body: comment },
  });

  const [closeIssue, { loading: closing }] = useMutation(CLOSE_ISSUE, {
    variables: { id },
  });

  const [reopenIssue, { loading: opening }] = useMutation(REOPEN_ISSUE, {
    variables: { id },
  });

  const [editIssue, { loading: editing, data: editData }] = useMutation(
    EDIT_ISSUE,
    {
      variables: { id, title: newTitle },
    }
  );

  const [deleteIssue, { loading: deleting, data: deleteData }] = useMutation(
    DELETE_ISSUE,
    {
      variables: { id },
    }
  );

  useEffect(() => {
    if (data && data.addComment?.commentEdge?.node.body) {
      let text = document.querySelector("textarea");
      if (!text) return;
      setComment("");
    }
  }, [data]);

  const { open, setOpen } = props;

  useEffect(() => {
    if (editData?.updateIssue?.issue?.author?.login) {
      setEdit(!edit);
      setOpen(!open);
    }

    if (deleteData?.deleteIssue?.repository?.id) {
      setOpen(!open);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData, deleteData]);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);
  return (
    <Modal
      open={open}
      close={() => {
        setOpen(!open);
      }}
    >
      {(loading || closing || opening || editing || deleting) && <Loading />}
      <div className="issue-header">
        {edit ? (
          <>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await editIssue();
                await refetch();
              }}
            >
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                style={{ width: "300px" }}
              />
              <button style={{ marginLeft: 16 }} className="btn-border">
                Update
              </button>
            </form>
            <span onClick={() => setEdit(!edit)}>
              <i className="material-icons">close</i>
            </span>
          </>
        ) : (
          <>
            <div>
              <h4>{title}</h4>
              {closed ? (
                <button
                  className="btn-border"
                  style={{
                    marginTop: 8,
                  }}
                  onClick={async () => {
                    await reopenIssue();
                    await refetch();
                  }}
                >
                  Reopen
                </button>
              ) : (
                <button
                  className="btn-border"
                  style={{
                    marginTop: 8,
                  }}
                  onClick={async () => {
                    await closeIssue();
                    await refetch();
                  }}
                >
                  Close
                </button>
              )}
            </div>
            <span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "80%",
                }}
              >
                <i
                  onClick={() => setEdit(!edit)}
                  className="material-icons"
                  style={{ fontSize: 18 }}
                >
                  edit
                </i>
                <i
                  className="material-icons"
                  onClick={async (e) => {
                    // eslint-disable-next-line no-restricted-globals
                    let ok = confirm(`Do you want to delete this issue?`);
                    if (ok) {
                      await deleteIssue();
                      await refetch();
                    }
                  }}
                  style={{ color: "#e91e63" }}
                >
                  delete
                </i>
              </div>
            </span>
          </>
        )}
      </div>
      <div className="comments">
        <div className="list">
          {totalCount > 0 ? (
            comments &&
            comments.map(({ author, body, id }) => {
              let pat = /@([a-zA-Z])\w+/;

              let html = "";
              if (body.match(pat)) {
                html = addLinks(body);
              }

              return (
                <div className="comment" key={id}>
                  <div className="usr">
                    <span className="flex">
                      <img
                        src={author.avatarUrl}
                        className="usr-image"
                        alt="img"
                      />
                    </span>
                    <h4
                      style={{ marginLeft: 8, textTransform: "capitalize" }}
                      dangerouslySetInnerHTML={{
                        __html: addLinks(`@${author.login}`),
                      }}
                    ></h4>
                  </div>

                  <div className="comment-body">
                    {html ? (
                      <div dangerouslySetInnerHTML={{ __html: html }}></div>
                    ) : (
                      body
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <h4>There are no comments</h4>
          )}
        </div>
        <div className="add-comment">
          <div>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              onClick={async () => {
                await addComment();
                await refetch();
              }}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditIssue;
