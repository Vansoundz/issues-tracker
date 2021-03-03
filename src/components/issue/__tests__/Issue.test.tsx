import { MockedProvider } from "@apollo/client/testing";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Issue } from "../../../models/issue.model";
import TestApp from "../../../TestApp";
import Label from "../../utils/Label";
import CreateIssue from "../CreateIssue";
import IssueComponent from "../Issue";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// We'll fill this in next

it("renders issue component", async () => {
  // const { queryByText } =
  render(
    <MockedProvider>
      <TestApp>
        <IssueComponent {...issue} />
      </TestApp>
    </MockedProvider>
  );

  const elem = await screen.findByText("some issue");
  const img = screen.getAllByAltText("vans");

  expect(elem).toBeTruthy();
  expect(img[0].getAttribute("src")).toBe(
    "https://avatars.githubusercontent.com/u/41210293?u=7292d43e96e2a79bdf8e66fcc288b34bdea14edf&v=4"
  );
});

it("renders create issue modal", async () => {
  const { findByTestId } = render(
    <MockedProvider>
      <TestApp>
        <CreateIssue open={true} close={() => {}} />
      </TestApp>
    </MockedProvider>
  );

  const title = await findByTestId("title");
  const body = await findByTestId("body");
  const repo = await findByTestId("search-repo");

  expect(title).toBeTruthy();
  expect(body).toBeTruthy();
  expect(repo).toBeTruthy();
});

it("renders label component", async () => {
  const { findByText } = render(
    <Label totalCount={1} nodes={[{ color: "blue", name: "label text" }]} />
  );

  const el = await findByText("label text");
  expect(el.innerHTML).toBe("label text");
});

describe("createIssue", () => {
  it("onChange title", async () => {
    const { findByTestId } = render(
      <MockedProvider>
        <TestApp>
          <CreateIssue open={true} close={() => {}} />
        </TestApp>
      </MockedProvider>
    );

    const title = await findByTestId("title");
    fireEvent.change(title, { target: { value: "test title" } });
    //  @ts-ignore
    expect(title.value).toBe("test title");
  });

  it("onChange body", async () => {
    const { findByTestId } = render(
      <MockedProvider>
        <TestApp>
          <CreateIssue open={true} close={() => {}} />
        </TestApp>
      </MockedProvider>
    );

    const body = await findByTestId("body");
    fireEvent.change(body, { target: { value: "test body" } });
    // @ts-ignore
    expect(body.value).toBe("test body");
  });

  it("onChange search repo", async () => {
    const { findByTestId } = render(
      <MockedProvider>
        <TestApp>
          <CreateIssue open={true} close={() => {}} />
        </TestApp>
      </MockedProvider>
    );

    const search = await findByTestId("search-repo");
    fireEvent.change(search, { target: { value: "test search" } });
    // @ts-ignore
    expect(search.value).toBe("test search");
  });

  it("onSubmit issue", async () => {
    const { findByText } = render(
      <MockedProvider>
        <TestApp>
          <CreateIssue open={true} close={() => {}} />
        </TestApp>
      </MockedProvider>
    );

    const btn = await findByText("create Issue");
    fireEvent.click(btn);
  });
});
