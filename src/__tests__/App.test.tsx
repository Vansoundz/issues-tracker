import React from "react";
import { render, screen } from "@testing-library/react";
import TestApp from "../TestApp";
import App from "../App";

it("renders without error", async () => {
  render(
    <TestApp>
      <App />
    </TestApp>
  );

  const el = screen.queryByTestId("app");

  expect(el).toBeTruthy();
});
