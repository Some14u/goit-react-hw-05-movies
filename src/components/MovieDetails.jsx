import { ControllerLink, urlSensitive, test } from "helpers/urlApi";
import Cast from "./Cast";
import Reviews from "./Reviews";
import { theMovieDbApi as dbApi, useMovieDbFetcher } from "helpers/theMovieDbApi";
import { Wrapper, Title, Details, Poster, Link } from "./MovieDetails.styled";


function extractYear(date) {
  return new Date((Date.parse(date)))?.getUTCFullYear() || date;
}

export default urlSensitive({ slug: ":movieId", expansive: true }, (props) => {
  const movieDetails = useMovieDbFetcher("MovieDetailsById", props.urlParams.movieId);
  console.log(movieDetails);
  if (!movieDetails) return;
  return (
    <>
      <ControllerLink path="<<<">Go back</ControllerLink>
      <Wrapper>
        <Poster src={dbApi.imgUrl + dbApi.posterPath + movieDetails.poster_path} alt={`${movieDetails.title} poster`} />
        <div>
          <Details>
            <Title>{movieDetails.title} ({extractYear(movieDetails.release_date)})</Title>
            <p>User score: {movieDetails.vote_average * 10}%</p>
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
            <b>Genres</b>
            <p>{movieDetails.genres.map(item => item.name).join(", ")}</p>
            <hr />
          <b>Additional information</b>
          <ul>
            <li>
              <Link path="cast">Cast</Link>
            </li>
            <li>
              <Link path="reviews">Reviews</Link>
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
});