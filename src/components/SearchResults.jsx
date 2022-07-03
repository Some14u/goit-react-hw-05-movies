import { theMovieDbApi } from "helpers/theMovieDbApi";
import { ControllerLink } from "helpers/urlApi";
import { useEffect } from "react";
import PropTypes from "prop-types";

export default function SearchResults({ query, resolvedCb }) {
  const data = theMovieDbApi.lazyGet("search/movie", { query });

  useEffect(() => { // On this stage the request should be resolved because of lazyGet
    resolvedCb(); // So we need to pass that back through resolvedCb
  });

  return (
    <section>
      {data.results.length === 0
        ? <p>There are no movies that matched your query.</p>
        : <ul>
          {data.results.map(item => (
            <li key={item.id}>
              <ControllerLink path={"/movies/" + item.id}>{item.title}</ControllerLink>
            </li>
          ))}
        </ul>
      }
    </section>
  );
}

SearchResults.propTypes = {
  query: PropTypes.string.isRequired,
  resolvedCb: PropTypes.func.isRequired,
}