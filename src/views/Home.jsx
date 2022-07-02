import { ControllerLink } from "helpers/urlApi";
import { theMovieDbApi } from "helpers/theMovieDbApi";


export default function Home() {
  const trending = theMovieDbApi.lazyGet("trending/movie/day");
  return (
    <section>
      <h2>Trending today</h2>
      <ul>
        {trending.results?.map(item =>
          <li key={item.id}>
            <ControllerLink path={`/movies/${item.id}`}>{item.title}</ControllerLink>
          </li>
        )}
      </ul>
    </section>
  );
};