import { theMovieDbApi } from "helpers/theMovieDbApi";
import { Portrait, Wrapper, ItemWrapper, Details, Character, Name } from "./Cast.styled";

import male from "../resources/male.gif";
import female from "../resources/female.gif";


export default function Cast(props) {
  const data = theMovieDbApi.lazyGet(`movie/${props.urlParams.movieId}/credits`);

  if (!data.cast || data.cast.length === 0) return <p>We don't have any information about cast for this movie.</p>;
  return (
    <Wrapper>
      {data.cast.map(item => (
        <li key={item.cast_id || item.id}>
          <ItemWrapper>
            <Portrait
              src={item.profile_path
                ? theMovieDbApi.imgUrl + theMovieDbApi.portraitPath + item.profile_path
                : item.gender === 1 ? female : male
              }
              alt={`${item.name}'s portrait`} />
            <Details>
              <Name>{item.name}</Name>
              <Character>Character:</Character>
              <div>{item.character}</div>
            </Details>
          </ItemWrapper>
        </li>
      ))}
    </Wrapper>
  );
};
