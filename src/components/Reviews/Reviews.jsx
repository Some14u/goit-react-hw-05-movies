import { Fragment } from "react";
import { theMovieDbApi } from "helpers/theMovieDbApi";
import { Wrapper, Text, Author, Timestamp } from "./Reviews.styled";
import PropTypes from "prop-types";

export default function Reviews(props) {
  const data = theMovieDbApi.lazyGet(`movie/${props.urlParams.movieId}/reviews`);

  if (!data.results || data.results.length === 0) return <p>We don't have any reviews for this movie.</p>;
  return (
    <Wrapper>
      {data.results.map(item => (
        <li key={item.id}>
          <Author>{item.author}</Author>
          <Text>{linkRenderer(item.content)}</Text>
          {(item.updated_at || item.created_at) && <Timestamp>{formatDate(item.updated_at || item.created_at)}</Timestamp>}
        </li>
      ))}
    </Wrapper>
  );
};


Reviews.propTypes = {
  urlParams: PropTypes.shape({
    movieId: PropTypes.string.isRequired,
  }).isRequired,
}


// Reassembles content to allow working urls and bold text
const linkRenderer = (content) => {
  const linkExp = /^https?:\/\/[a-z0-9_%#./-]*$/i;
  const boldExp = /^\*\*[^*]+\*\*$/i;
  const italicExp = /^_[^_]+_$/i;

  function parse(part, key) {
    let res = part;
    if (part.match(linkExp)) {
      res = <a
        href={part}
        onFocus={(e) => { e.stopPropagation() }}
        target="_blank"
        rel="noreferrer"
      >{part}</a>;
    } else if (part.match(boldExp)) {
      res = <b>{ part.substring(2, part.length - 2) }</b>;
    } else if (part.match(italicExp)) {
    res = <i>{ part.substring(1, part.length - 1) }</i>;
  }
  return <Fragment key={key}>{res}</Fragment>;
  }
  return content.split(/(https?:\/\/[a-z0-9_%#./-]*|\*\*[^*]+\*\*|_[^_]+_)/gi).map(parse);
}

function formatDate(date) {
  date = new Date(date);
  if (!date) return;
  return date.toLocaleString('en-us', { day: "numeric", month: "long", year: "numeric" });
}