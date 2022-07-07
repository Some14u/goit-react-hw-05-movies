import { importUrlAssociated } from "helpers/urlApi";
import Navigation from "../Navigation/Navigation";
import { Wrapper, Header, TMDBLogo } from "./App.styled";

const Home = importUrlAssociated("", "views/Home");
const Movies = importUrlAssociated({ slug: "movies", expansive: true }, "views/Movies");

export default function App() {
  return (
    <>
      <Header>
        <Navigation />
        <TMDBLogo />
      </Header>
      <Wrapper>
        <Home />
        <Movies />
      </Wrapper>
    </>
  );
}
