import { render, screen } from "@testing-library/react";
import TestApp from "../../TestApp";
import Index from "../Index";
// import Auth from "./Auth";

it("renders shows a log in button", async () => {
  render(
    <TestApp>
      <Index />
    </TestApp>
  );

  let el = screen.getByText("Log in with Github");
  expect(el).toBeTruthy();
});
