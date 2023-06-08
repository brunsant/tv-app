import LiveTvIcon from "@mui/icons-material/LiveTv";
import { styled } from "@mui/system";

const HeaderDiv = styled("div")({
  height: "60px",
  backgroundColor: "#ABC2DC",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  paddingLeft: "20px",
});

const Title = styled("h2")({
  fontSize: "36px",
  color: "#031F32",
});

const primary = "#E39E22";

const Header = () => {
  return (
    <HeaderDiv>
      <Title className="title">TV SEARCHER</Title>
      <LiveTvIcon sx={{ color: primary }} />
    </HeaderDiv>
  );
};

export default Header;
