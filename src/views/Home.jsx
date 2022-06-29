import { urlSensitive, ControllerLink } from "helpers/urlApi";
import { useMovieDbFetcher } from "helpers/theMovieDbApi";

export default urlSensitive("", () => {
  const trending = useMovieDbFetcher("TodayTrendingMovies");

  console.log("trending", trending);
  return (
    <section>
      <h2>Trending today</h2>
      <ul>
        {trending?.results?.map(item =>
          <li key={item.id}>
            <ControllerLink path={`/movies/${item.id}`}>{item.title}</ControllerLink>
          </li>
        )}
      </ul>
    </section>
  );
});