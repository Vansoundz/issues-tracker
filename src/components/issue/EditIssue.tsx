import { ApolloError, useMutation, useQuery } from "@apollo/client";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  ADD_COMMENT,
  CLOSE_ISSUE,
  DELETE_ISSUE,
  EDIT_ISSUE,
  REOPEN_ISSUE,
} from "../../graphql/mutations";
import { SEARCH_USER } from "../../graphql/queries";
import { User } from "../../models/user.model";
import { RootState } from "../../store";
import { TYPES } from "../../store/types";
import { addLinks } from "../../utils";
import Loading from "../layout/Loading";
import Modal from "../utils/Modal";

interface IEditIssue {
  refetch: () => void;
}

const EditIssue: FC<IEditIssue> = ({ refetch }) => {
  const { issue } = useSelector((state: RootState) => state.issues);
  if (issue)
    var {
      id,
      closed,
      title,
      comments: { nodes: comments, totalCount },
    } = issue;

  const [newTitle, setNewTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [edit, setEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const { editIssue: open } = useSelector((state: RootState) => state.issues);
  const dispatch = useDispatch();
  const onError = (error: ApolloError) => {
    toast(error.message, {
      type: "error",
      style: { color: "white" },
    });
  };

  const [addComment, { loading, data }] = useMutation(ADD_COMMENT, {
    variables: { id, body: comment },
    onCompleted: async () => {
      setUsers([]);
      await refetch();
    },
    onError,
  });

  useQuery(SEARCH_USER, {
    variables: { query },
    onCompleted: (data) => {
      let usrs: User[] = [];
      for (let user of data.search.edges) {
        usrs.push(user.node);
      }
      setUsers(usrs);
    },
    onError,
  });

  const [closeIssue, { loading: closing }] = useMutation(CLOSE_ISSUE, {
    variables: { id },
    onCompleted: async (d) => {
      await refetch();
      toast("Issue closed successfully", { type: "success" });
    },
    onError,
  });

  const [reopenIssue, { loading: opening }] = useMutation(REOPEN_ISSUE, {
    variables: { id },
    onCompleted: async (d) => {
      await refetch();
      toast("Issue reopened successfully", { type: "success" });
    },
    onError,
  });

  const [editIssue, { loading: editing }] = useMutation(EDIT_ISSUE, {
    variables: { id, title: newTitle },
    onCompleted: async (d) => {
      await refetch();
      toast("Issue edited successfully", { type: "success" });
      setEdit(!edit);
      dispatch({ type: TYPES.issues.SET_EDIT_ISSUE, payload: !open });
    },
    onError,
  });

  const [deleteIssue, { loading: deleting }] = useMutation(DELETE_ISSUE, {
    variables: { id },
    onCompleted: async (d) => {
      await refetch();
      toast("Issue deleted successfully", { type: "success" });
      dispatch({ type: TYPES.issues.SET_EDIT_ISSUE, payload: !open });
    },
    onError,
  });

  useEffect(() => {
    if (data && data.addComment?.commentEdge?.node.body) {
      let text = document.querySelector("textarea");
      if (!text) return;
      setComment("");
    }
  }, [data]);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  return (
    <Modal
      open={open}
      close={() => {
        dispatch({ type: TYPES.issues.SET_EDIT_ISSUE, payload: !open });
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
          <div className="ac-cont">
            <ul
              className="users dropdown"
              style={{
                left: (comment.length || 1) * 4.5,
                display: users.length ? "initial" : "none",
              }}
            >
              {users &&
                users.length > 0 &&
                users.map((user, i) => {
                  return (
                    <li
                      key={i}
                      className="user-com"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        let pat = /(@([a-zA-Z])\w+)$/g;

                        let matches = comment.match(pat);
                        if (!matches) return;

                        let login = matches[matches.length - 1].slice(1);
                        let com = comment.replace(login, user.login);
                        setComment(com);
                        setUsers([]);
                      }}
                    >
                      {user.login}
                    </li>
                  );
                })}
            </ul>
            <textarea
              rows={4}
              value={comment}
              // autoComplete={users.length ? users[0].login : ""}
              onChange={(e) => {
                setComment(e.target.value);
                let pat = /(@([a-zA-Z])\w+)$/g;

                let matches = e.target.value.match(pat);
                // console.log(matches);
                if (!matches) return;
                // matches = matches.filter((match) => {
                //   return !users.find((user) => user.login !== match.substr(1));
                // });

                // console.log(matches);

                if (matches.length > 0) {
                  // console.log(matches);
                  // console.log("Setting", matches[0].substr(1));
                  if (matches[matches.length - 1].substr(1).length > 2) {
                    setQuery(matches[matches.length - 1].substr(1));
                  } else {
                    setUsers([]);
                    setQuery("");
                  }
                }
              }}
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
