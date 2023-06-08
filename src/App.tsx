import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Details from "./components/Details";
import SearchResults from "./components/SearchResults";
import styled from "@emotion/styled";
import useSearchShows from "./hooks/useSearchShows";

const Wrapper = styled("div")({
  backgroundColor: "#F1F1E6",
  minHeight: "100vh",
});

const SearchContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginTop: "50px",
  alignItems: "center",
});

const Loading = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
  fontSize: "20px",
});

const Error = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
  fontSize: "20px",
  color: "red",
});

function App() {
  const { showsData, loading, error, searchShows } = useSearchShows();

  const handleSearch = async (query: string) => {
    await searchShows(query);
  };

  return (
    <BrowserRouter>
      <Wrapper>
        <Header />
        {loading ? (
          <Loading>Loading...</Loading>
        ) : error ? (
          <Error>{error}</Error>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <SearchContainer>
                  <SearchBar onSearch={handleSearch} />
                  <SearchResults showsData={showsData} />
                </SearchContainer>
              }
            ></Route>
            <Route
              path="/details/:id"
              element={<Details showsData={showsData} />}
            ></Route>
          </Routes>
        )}
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
