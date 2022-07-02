import { importUrlAssociated } from "helpers/urlApi";
const MovieDetails = importUrlAssociated({ slug: ":movieId", expansive: true }, "components/MovieDetails");
const Search = importUrlAssociated({ index: true }, "components/Search");


export default function Movies() {
  return (
    <section>
      <Search />
      <MovieDetails />
    </section>
  );
};