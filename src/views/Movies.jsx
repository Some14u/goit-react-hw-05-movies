import { urlSensitive } from "helpers/urlApi";
import MovieDetails from "components/MovieDetails";
import Search from "components/Search";

export default urlSensitive({ slug: "movies", expansive: true }, () => {
  return (
    <section>
      <Search />
      <MovieDetails />
    </section>
  );
});