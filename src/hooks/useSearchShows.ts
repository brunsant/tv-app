import { useState } from "react";
import axios from "axios";
import { ShowSearchResult } from "../types/Show";

const API_URL = "https://api.tvmaze.com/search/shows";

interface SearchResult {
  showsData: ShowSearchResult[];
  setShowsData: React.Dispatch<React.SetStateAction<ShowSearchResult[]>>;
  loading: boolean;
  error: string;
  searchShows: (query: string) => Promise<void>;
}

const useSearchShows = (): SearchResult => {
  const [showsData, setShowsData] = useState<ShowSearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const searchShows = async (query: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(API_URL, {
        params: { q: query },
      });

      const formattedData = response.data;

      setShowsData(formattedData);
    } catch (error) {
      console.error("Error occurred while fetching TV shows", error);
      setError("Error occurred while fetching the TV shows");
    } finally {
      setLoading(false);
    }
  };
  return { showsData, setShowsData, loading, error, searchShows };
};

export default useSearchShows;
