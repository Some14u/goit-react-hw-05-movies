import { importUrlAssociated } from "helpers/urlApi";
import { theMovieDbApi } from "helpers/theMovieDbApi";
import { Wrapper, Title, Details, Poster, Link, BackLink } from "./MovieDetails.styled";

import PageNotFound from "views/PageNotFound";
const Cast = importUrlAssociated("cast", "components/Cast");
const Reviews = importUrlAssociated("reviews", "components/Reviews");


export default function MovieDetails(props) {
  const movieDetails = theMovieDbApi.lazyGet("movie/" + props.urlParams.movieId);

  if (movieDetails === null) return <PageNotFound />; // No data after responce
  return (
    <>
      <BackLink path="<<<" hideable >Go back</BackLink>
      <Wrapper>
        <Poster src={theMovieDbApi.imgUrl + theMovieDbApi.posterPath + movieDetails.poster_path} alt={`${movieDetails.title} poster`} />
        <div>
          <Details>
            <Title>{movieDetails.title}{extractYear(movieDetails.release_date)}</Title>
            <p>User score: {movieDetails.vote_average * 10}%</p>
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
            <b>Genres</b>
            <p>{movieDetails.genres.map(item => item.name).join(", ")}</p>
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

function extractYear(date) {
  if (!date || date === "") return "";
  return " (" + (new Date((Date.parse(date)))?.getUTCFullYear() || date) + ")"
}