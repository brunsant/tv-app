import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

jest.mock("../hooks/useSearchShows", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    showsData: [],
    loading: false,
    error: "Error occurred while fetching the TV shows",
    searchShows: async () => {},
  })),
}));

describe("App", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("renders error message when error is true", async () => {
    render(<App />);

    expect(
      screen.getByText("Error occurred while fetching the TV shows")
    ).toBeInTheDocument();
  });
});
