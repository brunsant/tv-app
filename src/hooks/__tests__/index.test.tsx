import { renderHook, act } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import axios from "axios";
import useSearchShows from "../useSearchShows";

jest.mock("axios");

describe("useSearchShows", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch shows data successfully", async () => {
    const mockResponse = [
      {
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
      {
        id: 63500,
        name: "Super/Natural",
        genres: ["Nature"],
        image: {
          medium:
            "https://static.tvmaze.com/uploads/images/medium_portrait/418/1046243.jpg",
          original:
            "https://static.tvmaze.com/uploads/images/original_untouched/418/1046243.jpg",
        },
        summary:
          "<p><b>Super/Natural</b> will utilize the latest scientific innovations and leading-edge filmmaking technology to reveal the secret powers and super-senses of the world's most extraordinary animals, inviting viewers to see and hear beyond normal human perception to experience the natural world as a specific species does — from seeing flowers in bee-vision to eavesdropping on a conversation between elephant seals to soaring the length of a football field with glow-in-the-dark squirrels.</p>",
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() => useSearchShows());

    const { showsData, loading, error, searchShows } = result.current;

    expect(showsData).toEqual([]);
    expect(loading).toBe(false);
    expect(error).toBe("");

    await act(async () => {
      await searchShows("query");
      await waitFor(() => result.current.loading === false);
    });

    expect(axios.get).toHaveBeenCalledWith(
      "https://api.tvmaze.com/search/shows",
      {
        params: { q: "query" },
      }
    );

    expect(result.current.showsData).toEqual(mockResponse);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });
});
