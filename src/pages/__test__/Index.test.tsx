import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";
import { ISSUES } from "../../graphql/queries";
import { Issue, IssueFilters } from "../../models/issue.model";
import TestApp from "../../TestApp";
import Issues from "../Issues";
import React from "react";
import Index from "../Index";

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
  body: "lorem ipsum  vpiuagsud",
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
];

it("renders whith github link", async () => {
  const { findByText } = render(
    <TestApp>
      <Index />
    </TestApp>
  );

  const el = await findByText("Log in with Github");
  expect(el).toBeTruthy();
});

it("rendersIssueComponent", async () => {
  const { findAllByText } = render(
    <>
      <TestApp>
        <MockedProvider mocks={mocks}>
          <Issues />
        </MockedProvider>
      </TestApp>
    </>
  );

  const els = await findAllByText("some issue");
  expect(els).toBeTruthy();
});
