import { useUrlContext } from "helpers/urlApi";
import { useEffect } from "react";

export default function PageNotFound() {
  const urlContext = useUrlContext();
  useEffect(() => {
    urlContext.setUrl({ path: "/", search: "" });
  }, [urlContext]);

}