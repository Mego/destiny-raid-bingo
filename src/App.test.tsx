import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders raid selection", () => {
  const { getByText } = render(<App />);
  const selectElement = getByText(/Select Raid/i);
  expect(selectElement).toBeInTheDocument();
});
