export interface Show {
  id: number;
  name: string;
  summary: string;
  genres: string[];
  image?: Image;
}

export interface ShowSearchResult {
  score: string;
  show: Show;
}

export interface Image {
  medium?: string;
  original?: string;
}
