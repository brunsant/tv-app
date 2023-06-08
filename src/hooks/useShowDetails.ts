import { useState, useEffect } from "react";
import axios from "axios";
import { Show, ShowSearchResult } from "../types/Show";

const API_URL = "https://api.tvmaze.com/shows";

const useShowDetails = (
  showId: number,
  showsData: ShowSearchResult[] | undefined
) => {
  const [showDetails, setShowDetails] = useState<Show | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (showsData && showsData.length > 0) {
          const showData = showsData.find((show) => show.show.id === showId);
          if (showData) {
            setShowDetails(showData.show);
          } else {
            setShowDetails(null);
          }
        } else {
          const response = await axios.get(`${API_URL}/${showId}`);
          const showData: Show | null = response.data;
          setShowDetails(showData);
        }
      } catch (error) {
        console.error("Error occurred while fetching TV show details", error);
        setError("Error occurred while fetching show details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowDetails();
  }, [showId, showsData]);

  return { showDetails, isLoading, error };
};

export default useShowDetails;
