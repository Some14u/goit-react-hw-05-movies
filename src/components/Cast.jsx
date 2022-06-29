import { urlSensitive } from "helpers/urlApi";
import { theMovieDbApi as dbApi, useMovieDbFetcher } from "helpers/theMovieDbApi";
import { Portrait, Wrapper, Details } from "./Cast.styled";
import male from "../resources/male.gif";
import female from "../resources/female.gif";

export default urlSensitive("/movies/:movieId/cast", (props) => {
  const data = useMovieDbFetcher("Cast", props.urlParams.movieId);
  if (!data) return;
  return (
    <>
      {data.cast?.length === 0
        ? <p>We don't have any information about cast for this movie.</p>
        : <ul>
          {data.cast.map(item => (
            <li key={item.cast_id || item.id}>
              <Wrapper>
                <Portrait
                  src={item.profile_path
                    ? dbApi.imgUrl + dbApi.portraitPath + item.profile_path
                    : item.gender === 1 ? female : male
                  }
                  alt={`${item.name}'s portrait`} />
                <Details>
                  <p>{item.name}</p>
                  <p>Character: {item.character}</p>
                </Details>
              </Wrapper>
            </li>
          ))}
        </ul>
      }
    </>
  );
});
