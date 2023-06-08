import { ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { ShowSearchResult } from "../../types/Show";
import styled from "@emotion/styled";

interface ShowListProps {
  showsData: ShowSearchResult[];
}

const ResultContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr",
  width: "70%",
  marginTop: "5%",

  "@media (min-width:640px)": {
    gridTemplateColumns: "1fr 1fr",
  },

  "@media (min-width:768px)": {
    gridTemplateColumns: "1fr 1fr 1fr",
  },
});

const Image = styled("img")({
  height: "200px",
  width: "150px",
});

const ItemContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  margin: "auto",
});

const SearchResults = ({ showsData }: ShowListProps) => {
  return (
    <ResultContainer>
      {showsData.map((row) => (
        <ListItem
          key={row.show.id}
          button
          component={Link}
          to={`/details/${row.show.id}`}
          state={showsData}
        >
          <ItemContainer>
            {row.show.image?.medium && (
              <Image
                src={row.show.image?.medium || row.show.image?.original}
                alt={`Poster of ${row.show.name}`}
              />
            )}

            <ListItemText primary={row.show.name} />
          </ItemContainer>
        </ListItem>
      ))}
    </ResultContainer>
  );
};

export default SearchResults;
