import { Breadcrumbs, Typography, Link, styled } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import useShowDetails from "../../hooks/useShowDetails";
import { ShowSearchResult } from "../../types/Show";

const DetailsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: " 5% 20%",
});

const Image = styled("img")({
  height: "200px",
  width: "150px",
});

const NotFoundContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20%",
});

const NotFoundText = styled("h2")({
  marginBottom: "10%",
});

const Details = ({ showsData }: { showsData: ShowSearchResult[] }) => {
  const { id } = useParams<{ id?: string }>();
  const showId = id ? parseInt(id) : 0;

  const { showDetails } = useShowDetails(showId, showsData);

  const location = useLocation();
  const referer = location.state?.referer || "/";

  if (!showDetails) {
    return (
      <NotFoundContainer>
        <NotFoundText>Show not found</NotFoundText>
        <Link underline="hover" color="inherit" href={referer}>
          Return to the home page
        </Link>
      </NotFoundContainer>
    );
  }
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href={referer}>
          Home
        </Link>
        <Typography color="text.primary">Details</Typography>
      </Breadcrumbs>
      <DetailsContainer>
        {showDetails?.image?.medium && (
          <Image
            src={showDetails?.image?.medium}
            alt={`Poster of ${showDetails?.name}`}
          />
        )}
        <h3>{showDetails?.name}</h3>

        <div>
          <Typography>{showDetails?.genres?.join(" / ")}</Typography>
          <Typography>
            {showDetails?.summary ? parse(showDetails.summary) : null}
          </Typography>
        </div>
      </DetailsContainer>
    </div>
  );
};

export default Details;
