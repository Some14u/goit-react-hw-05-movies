import { importUrlAssociated } from "helpers/urlApi";
import { theMovieDbApi } from "helpers/theMovieDbApi";
import { Wrapper, Title, Details, Poster, Link, BackLink } from "./MovieDetails.styled";
import PropTypes from "prop-types";

import PageNotFound from "views/PageNotFound";
const Cast = importUrlAssociated("cast", "components/Cast");
const Reviews = importUrlAssociated("reviews", "components/Reviews");


export default function MovieDetails(props) {
  const data = theMovieDbApi.lazyGet("movie/" + props.urlParams.movieId);
  if (data === null || data.success === false) return <PageNotFound />; // No data after responce
  return (
    <>
      <BackLink path="<<<" fallback="/movies">Go back</BackLink>
      <Wrapper>
        <Poster src={theMovieDbApi.imgUrl + theMovieDbApi.posterPath + data.poster_path} alt={`${data.title} poster`} />
        <div>
          <Details>
            <Title>{data.title}{extractYear(data.release_date)}</Title>
            <p>User score: {data.vote_average * 10}%</p>
            <h3>Overview</h3>
            <p>{data.overview}</p>
            <b>Genres</b>
            <p>{data.genres.map(item => item.name).join(", ")}</p>
            <hr />
          <b>Additional information</b>
          <ul>
            <li>
              <Link path="cast" historyAction="replace">Cast</Link>
            </li>
            <li>
              <Link path="reviews" historyAction="replace">Reviews</Link>
            </li>
          </ul>
          </Details>
        </div>
      </Wrapper>
      <hr />
      <Cast />
      <Reviews />
    </>
  );
};


MovieDetails.propTypes = {
  urlParams: PropTypes.shape({
    movieId: PropTypes.string.isRequired,
  }).isRequired,
}


function extractYear(date) {
  if (!date || date === "") return "";
  return " (" + ((new Date(date))?.getUTCFullYear() || date) + ")"
}