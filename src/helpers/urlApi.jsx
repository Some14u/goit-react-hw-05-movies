import React, { createContext, useContext, useRef, useEffect, useReducer, useState } from "react";
import { useSingleton } from "./common";



function buildPathRegexTemplate(path) {
  return "^" + path
    .replace(/\/\*$/, ".*")
    .replace(/\/:([a-zA-Z0-9_]+)/g, (_, name) => `/(?<${name}>[a-zA-Z0-9_]+)`) //substitute every parameter to template
    .replaceAll("/", "\\/") // escape /
    + "\\/?$";
}

function extractPathByMask(currentPath, mask) {
  mask = mask
    .replace(/\/\*$/, "")
    .replace(/\/:([a-zA-Z0-9_]+)/g, "/[a-zA-Z0-9_]+")
    .replaceAll("/", "\\/");
  return currentPath.match(mask)[0] + "/";
}

function compareAndParsePath(template, path = window.location.pathname) {
  const test = new RegExp(template).exec(path);
  // console.log(path, template, test, test?.groups);
  return test && { ...test.groups || {}, search: window.location.search };
}

function comparePaths(comparable, comparing, exactMatch) {
  if (comparing.at(-1) !== "/") comparing += "/";
  if (comparable.at(-1) !== "/") comparable += "/";
  if (exactMatch) return comparing === comparable;
  return comparable.startsWith(comparing);
}

const getUrlPath = () => window.location.pathname;
const getUrlSearch = () => window.location.search;


function useUrl() {
  const [url, setUrl] = useReducer(urlReducer, { path: getUrlPath(), search: getUrlSearch() });

  function urlReducer(oldUrl, {path = oldUrl.path, search = oldUrl.search, historyAction = "add"}) {
    const newurl = window.location.protocol + "//" + window.location.host + path + search;
    if (historyAction === "add") {
      window.history.pushState({ previous: window.history.state?.path, path: newurl }, "", newurl);
    }
    if (historyAction === "update") {
      window.history.updateState(window.history.state || {}, "", newurl);
    }
    console.log("urlReducer", window.history);
    return { path, search };
  }

  useEffect(() => {
    const handleHistoryChange = event => {
      console.log("url updated to current url")
      setUrl({ path: getUrlPath(), search: getUrlSearch(), historyAction: "skip" });
    };
    window.addEventListener('popstate', handleHistoryChange);

    return () => window.removeEventListener("popstate", handleHistoryChange);
  }, []);

  return [url, setUrl];
}


const urlContext = createContext();
export const useUrlContext = () => useContext(urlContext);

export function UrlProvider({ structure, children }) {
  const [url, setUrl] = useUrl();
  const documentTitle = useRef(document.title);
  const urlPassedValidation = useRef(false);

  const toContext = {
    setUrl,
    url,
    urlPath: url.path,
    urlSearch: url.search,
    documentTitle: documentTitle.current,
    urlPassedValidation,
  }

  return (
    <urlContext.Provider value={toContext}>
      {children}
      <Test />
    </urlContext.Provider>);
}

function Test() {
  const urlContext = useUrlContext();
  if (!urlContext.urlPassedValidation.current) {
//    urlContext.setUrl({ path: "/" });
  }
}

const urlCurrentPathContext = createContext({path: "/"});

export function ControllerLink(props) {
  const urlContext = useUrlContext();
  const currentPathContext = useContext(urlCurrentPathContext);

  const href = useRef(props.path);

  useSingleton(() => {
    if (href.current.startsWith("/")) return;
    href.current = extractPathByMask(urlContext.urlPath, currentPathContext.path) + href.current;
  });

  useEffect(() => {

  }, [urlContext.urlPath]);

  function onClick(event) {
    event.preventDefault();
    // console.log("going to ",href.current)
    urlContext.setUrl({ path: href.current, search: "", actionDescription: props.actionDescription });
  }

  let className = [];
  if (props.className) className.push(props.className);
  if (comparePaths(urlContext.urlPath, href.current)) className.push("matchUrl");
  if (comparePaths(urlContext.urlPath, href.current, true)) className.push("exactMatchUrl");
  className = className.join(" ");

  return (
    <a {...props} onClick={onClick} className={className !== "" ? className : undefined} href={href.current}>
      {props.children}
    </a>
  );
}


function updateDocumentTitle(title, path, search) {
  if (path.startsWith("/")) path = path.substring(1);
  if (path.endsWith("/*")) path = path.substring(0, path.length - 2);
  if (path.endsWith("/")) path = path.substring(0, path.length - 1);
  if (path !== "") title = title + " | " + path;
  document.title = title + search;
}

export function urlSensitive(path, WrappedComponent) {
  return props => {
    const urlContext = useUrlContext();
    const pathTemplate = useRef(buildPathRegexTemplate(path));
    const urlParams = compareAndParsePath(pathTemplate.current);
    console.log(">>>", path, WrappedComponent);
    if (!urlParams) return;
    // Update document title to follow current url
    updateDocumentTitle(urlContext.documentTitle, extractPathByMask(urlContext.urlPath, path), urlContext.urlSearch);
    if (!path.endsWith("/*")) {
      console.log("class granted urlvalidation", path)
      urlContext.urlPassedValidation.current = true;
    }
    return (
      <urlCurrentPathContext.Provider value={{path}}>
        <WrappedComponent {...props} urlParams={urlParams} />
      </urlCurrentPathContext.Provider>
    );
  }
}


