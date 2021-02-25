import React, { FC, useEffect, useState } from "react";
import { Issue as IssueModel } from "../../models/issue.model";
import Label from "./Label";
import Modal from "../utils/Modal";
import { gql, useMutation } from "@apollo/client";
import Loading from "../layout/Loading";

const ADD_COMMENT = gql`
  mutation MyMutation($id: ID!, $body: String!) {
    addComment(input: { subjectId: $id, body: $body }) {
      clientMutationId
      commentEdge {
        node {
          author {
            login
          }
          body
        }
      }
    }
  }
`;

const IssueComponent: FC<IssueModel & { refetch: () => void }> = (props) => {
  const {
    id,
    title,
    comments: { totalCount, nodes: comments },
    author: { login },
    labels,
    assignees: { nodes, totalCount: numOfPeople },
    refetch,
  } = props;
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState<string>("");

  const [addComment, { loading, data }] = useMutation(ADD_COMMENT, {
    variables: { id, body: comment },
  });

  useEffect(() => {
    if (data && data.addComment?.commentEdge?.node.body) {
      let text = document.querySelector("textarea");

      if (!text) return;
      setComment("");
    }
  }, [data]);

  return (
    <div className="issue-entry">
      {loading && <Loading />}
      <Modal
        open={open}
        close={() => {
          setOpen(!open);
        }}
      >
        <div className="issue-header">
          <h4>{title}</h4>
        </div>
        <div className="comments">
          <div className="list">
            {totalCount > 0 ? (
              comments &&
              comments.map(({ author, body, id }) => {
                return (
                  <div className="comment" key={id}>
                    <div className="usr">
                      <span>
                        <img
                          src={author.avatarUrl}
                          className="usr-image"
                          alt="img"
                        />
                      </span>
                      <h4 style={{ marginLeft: 8 }}>{author.login}</h4>
                    </div>
                    <div className="comment-body">{body}</div>
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
      <div className="tb-item">
        <div className="issue" onClick={() => setOpen(!open)}>
          <h4>{title}</h4>
          <small>
            {" "}
            {totalCount ? totalCount : "no"} comment
            {totalCount !== 1 ? "s" : ""}
          </small>
        </div>
      </div>
      <div className="tb-item">
        {numOfPeople > 0 ? nodes[numOfPeople - 1].login : ""}
      </div>
      <div className="tb-item">{login}</div>
      <div className="tb-item">
        <Label {...labels} />
      </div>
    </div>
  );
};

export default IssueComponent;
