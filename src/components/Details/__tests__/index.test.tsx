import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Details from "..";
import { ShowSearchResult } from "../../../types/Show";

const mockResponse: ShowSearchResult[] = [
  {
    show: {
      id: 19,
      name: "Supernatural",
      genres: ["Drama", "Action", "Supernatural"],
      image: {
        medium:
          "https://static.tvmaze.com/uploads/images/medium_portrait/445/1114097.jpg",
        original:
          "https://static.tvmaze.com/uploads/images/original_untouched/445/1114097.jpg",
      },
      summary:
        "<p>This haunting series follows the Winchester brothers as they crisscross the lonely and mysterious back roads of the country in their '67 Chevy Impala, hunting down every evil supernatural force they encounter along the way.</p>",
    },
    score: "",
  },
];

test("should display 'Show not found' message when an invalid show ID is provided", () => {
  render(
    <BrowserRouter>
      <Details showsData={mockResponse} />
    </BrowserRouter>
  );

  const notFoundMessage = screen.getByText("Show not found");
  const homeLink = screen.getByRole("link", {
    name: "Return to the home page",
  });

  expect(notFoundMessage).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
});

test("should display the home link", () => {
  render(
    <BrowserRouter>
      <Details showsData={mockResponse} />
    </BrowserRouter>
  );

  const homeLink = screen.getByRole("link", {
    name: "Return to the home page",
  });

  expect(homeLink).toBeInTheDocument();
});
