import { gql } from "@apollo/client";

const ISSUES = gql`
  query Issues($filters: IssueFilters!) {
    viewer {
      issues(first: 10, filterBy: $filters) {
        totalCount
        nodes {
          id
          title
          body
          closed
          author {
            login
            avatarUrl
          }
          assignees(first: 5) {
            totalCount
            nodes {
              login
              avatarUrl
            }
          }
          labels(first: 5) {
            totalCount
            nodes {
              color
              name
            }
          }
          comments(first: 10) {
            nodes {
              author {
                login
                avatarUrl
              }
              body
              id
            }
            totalCount
          }
        }
      }
    }
  }
`;

const SEARCH = gql`
  query SearchQuery($query: String!) {
    search(query: $query, type: ISSUE, first: 10) {
      issueCount
      nodes {
        ... on Issue {
          id
          body
          closed
          author {
            login
            avatarUrl
          }
          assignees(first: 5) {
            totalCount
            nodes {
              login
              avatarUrl
            }
          }
          labels(first: 5) {
            totalCount
            nodes {
              color
              name
            }
          }
          comments(first: 10) {
            nodes {
              author {
                login
                avatarUrl
              }
              body
              id
            }
            totalCount
          }
          title
        }
      }
    }
  }
`;

const GET_REPOS = gql`
  query Repos {
    viewer {
      repositories(first: 20) {
        nodes {
          id
          isPrivate
          name
          owner {
            login
            avatarUrl
            id
          }
        }
      }
    }
  }
`;

// Search repo
const SEARCH_REPO = gql`
  query SearchRepo($query: String!) {
    search(query: $query, type: REPOSITORY, first: 5) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            id
          }
        }
      }
    }
  }
`;

const SEARCH_USER = gql`
  query searchUser($query: String!) {
    search(query: $query, type: USER, first: 5) {
      edges {
        node {
          ... on User {
            id
            login
          }
        }
      }
    }
  }
`;

export { ISSUES, SEARCH, GET_REPOS, SEARCH_REPO, SEARCH_USER };
