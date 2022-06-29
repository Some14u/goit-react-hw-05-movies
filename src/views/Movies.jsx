import { urlSensitive } from "helpers/urlApi";
import MovieDetails from "components/MovieDetails";
import Search from "components/Search";

export default urlSensitive("/movies/*", () => {
  return (
    <section>
      <Search />
      <MovieDetails />
    </section>
  );
});