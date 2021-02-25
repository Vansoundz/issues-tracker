import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
// import { useDispatch } from "react-redux";

const GITHUB_QUERY = gql`
  query($number_of_repos: Int!) {
    viewer {
      name
      repositories(last: $number_of_repos) {
        nodes {
          name
        }
      }
      issues(last: 10) {
        nodes {
          body
          author {
            login
          }
          editor {
            login
          }
          id
          closed
          databaseId
          createdAt
          title
          repository {
            id
          }
        }
      }
      login
    }
  }
`;

interface Node {
  author: {
    login: String;
  };
  __typename: string;
  body: string;
  closed: boolean;
  createdAt: string;
  databaseId: number;
  editor: object;
  id: string;
  repository: {
    id: string;
    __typename: string;
  };
  title: string;
}

const Index = () => {
  const { loading, data, error } = useQuery(GITHUB_QUERY, {
    variables: { number_of_repos: 3 },
  });

  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    console.log(data);
    if (data && data.viewer.issues?.nodes) {
      setNodes(data.viewer.issues?.nodes);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  //@ts-ignore
  return (
    <div>
      <h4>Issues</h4>
      <div>
        {nodes &&
          nodes.map((node) => {
            return (
              <div key={node.id}>
                <h5>{node.title}</h5>
                <small>by @{node.author.login}</small>
                <div>{node.body}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Index;
