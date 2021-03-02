import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ISSUES } from "../../graphql/queries";
import { Issue, IssueFilters } from "../../models/issue.model";
import TestApp from "../../TestApp";
import IssueComponent from "./Issue";

let filters: IssueFilters = {};

let issue: Issue = {
  assignees: {
    nodes: [],
    totalCount: 0,
  },
  author: {
    avatarUrl:
      "https://avatars.githubusercontent.com/u/41210293?u=7292d43e96e2a79bdf8e66fcc288b34bdea14edf&v=4",
    email: "email@gmail.com",
    id: "12345678",
    login: "vans",
    name: "keeps man",
  },
  body: "lorem ipsum vpiuagsud",
  closed: true,
  comments: {
    nodes: [],
    totalCount: 0,
  },
  id: "",
  labels: {
    nodes: [],
    totalCount: 0,
  },
  title: "some issue",
};

const mocks = [
  {
    request: {
      query: ISSUES,
      variables: {
        filters,
      },
    },
    result: {
      data: {
        viewer: {
          issues: {
            totalCount: 1,
            nodes: [issue],
          },
        },
      },
    },
  },
]; // We'll fill this in next

it("renders without error", async () => {
  // const { queryByText } =
  render(
    <MockedProvider mocks={mocks}>
      <TestApp>
        <IssueComponent {...issue} />
      </TestApp>
    </MockedProvider>
  );

  const elem = await screen.findByText("some issue");

  // const el = queryByText("some issue");

  expect(elem).toBeTruthy();
});
