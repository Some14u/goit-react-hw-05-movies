import { useState, useEffect, useMemo } from "react";
import { useUrlContext } from "helpers/urlApi";
import { Form, Input, Button } from "./Search.styled";

import { importUrlAssociated } from "helpers/urlApi";
const SearchResults = importUrlAssociated({ index: true }, "components/SearchResults");


export default function Search() {
  const urlContext = useUrlContext();

  const urlQuery = useMemo(() => {
    return new URLSearchParams(urlContext.url.search).get("query");
  }, [urlContext.url.search]);
  const [formQuery, setFormQuery] = useState(urlQuery || "");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => { // Updates pending status and current form query string to match urlQuery changes
    setIsPending(urlQuery)
    setFormQuery(urlQuery || "");
  }, [urlQuery]);

  function handleSubmit(event) {
    event.preventDefault();
    const query = formQuery.trim();
    if (query === "" || query === urlQuery) return;
    const params = new URLSearchParams({ query });
    urlContext.setUrl({ search: "?" + params.toString() });
  }

  function handleInputChange(event) {
    setFormQuery(event.currentTarget.value);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input name="query" type="text" disabled={isPending} onChange={handleInputChange} value={formQuery} />
        <Button type="submit" disabled={isPending}>Search</Button>
      </Form>
      {urlQuery && <SearchResults query={urlQuery} resolvedCb={() => setIsPending(false)} />}
    </>
  );
}