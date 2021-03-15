import { gql } from "@apollo/client";

// Issues
const CREATE_ISSUE = gql`
  mutation CreateIssue($id: ID!, $title: String!, $body: String) {
    createIssue(input: { repositoryId: $id, title: $title, body: $body }) {
      issue {
        body
      }
    }
  }
`;

const CLOSE_ISSUE = gql`
  mutation($id: ID!) {
    closeIssue(input: { issueId: $id }) {
      issue {
        closed
      }
    }
  }
`;

const REOPEN_ISSUE = gql`
  mutation($id: ID!) {
    reopenIssue(input: { issueId: $id }) {
      issue {
        closed
      }
    }
  }
`;

const EDIT_ISSUE = gql`
  mutation Edit($id: ID!, $title: String!) {
    updateIssue(input: { id: $id, title: $title }) {
      issue {
        author {
          login
        }
      }
    }
  }
`;

const DELETE_ISSUE = gql`
  mutation DeleteIssue($id: ID!) {
    deleteIssue(input: { issueId: $id }) {
      repository {
        id
      }
    }
  }
`;

// Comments
const ADD_COMMENT = gql`
  mutation($id: ID!, $body: String!) {
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

export {
  CREATE_ISSUE,
  ADD_COMMENT,
  CLOSE_ISSUE,
  DELETE_ISSUE,
  EDIT_ISSUE,
  REOPEN_ISSUE,
};
