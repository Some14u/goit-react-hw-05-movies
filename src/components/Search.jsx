import { useUrlContext, ControllerLink, urlSensitive } from "helpers/urlApi";
import { useState, useEffect } from "react";
import { Form, Input, Button } from "./Search.styled";
import { theMovieDbApi } from "helpers/theMovieDbApi";

export default urlSensitive("/movies", () => {
  const urlContext = useUrlContext();

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState();

  useEffect(() => {
    const params = new URLSearchParams(urlContext.urlSearch);
    if (params.has("query")) {
      const query = params.get("query");
      setStatus("searching");
      console.log("set query", query)
      setQuery(query);
      const getDataPromise = theMovieDbApi.searchMoviesByName(query);
      getDataPromise.then(data => {
        setData(data);
        setStatus("idle");
      });
      return () => getDataPromise.cancel();
    } else {
      setData(undefined);
      setQuery("");
    }
  }, [urlContext.urlSearch]);

  function handleSubmit(event) {
    event.preventDefault();
    if (query.trim() === "") return;
    const params = new URLSearchParams({ query });
    urlContext.setUrl({ search: "?" + params.toString() });
  }
  // console.log(window.location);

  function handleInputChange(event) {
    setQuery(event.currentTarget.value);
  }

  // console.log("data", data);
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input name="query" type="text" disabled={status === "searching"} onChange={handleInputChange} value={query} />
        <Button type="submit" disabled={status === "searching"} >Search</Button>
      </Form>
      {data?.results &&
        <section>
          {data.results.length === 0
            ? <p>There are no movies that matched your query.</p>
            : <ul>
              {data.results.map(item => (
                <li key={item.id}>
                  <ControllerLink path={"/movies/"+item.id}>{item.title}</ControllerLink>
                </li>
              ))}
            </ul>
          }
        </section>
      }
    </>
  );
});