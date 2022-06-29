import { Fragment } from "react";
import { urlSensitive } from "helpers/urlApi";
import { useMovieDbFetcher } from "helpers/theMovieDbApi";

export const linkRenderer = (string: string):ReactNode => {
  const linkExp = /^https?:\/\/[a-z0-9_./-]*$/i
  return <>{
    string.split(/(https?:\/\/[a-z0-9_./-]*)/gi).map((part, key) =>
      <Fragment key={key}>
        {part.match(linkExp) ? <a
          href={part}
          onFocus={(e) => { e.stopPropagation() }}
          target="_blank"
          rel="noreferrer"
        >{part}</a>
        : part}
      </Fragment>)
  }</>
}

export default urlSensitive("/movies/:movieId/reviews", props => {
  const reviews = useMovieDbFetcher("Reviews", props.urlParams.movieId);
//  console.log(reviews);
  if (!reviews) return;
  return (
    <>
      {reviews.results?.length === 0
        ? <p>We don't have any reviews for this movie.</p>
        : <ul>
          {reviews.results.map(item => (
            <li key={item.id}>
              <h3>Author: {item.author}</h3>
              <p>{linkRenderer(item.content)}</p>
            </li>
          ))}
        </ul>
      }
    </>
  );
});
