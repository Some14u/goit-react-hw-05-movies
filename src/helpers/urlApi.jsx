import React, { createContext, useContext, useRef, useEffect, useReducer, useMemo } from "react";
import PageNotFound from "views/PageNotFound";

import { ErrorBoundary } from "react-error-boundary";
import MySpinner from "components/Spinner.styled";

import { lazy, Suspense } from "react";

import PropTypes from "prop-types";


const urlContext = createContext();
const urlCurrentPathContext = createContext({ path: "" });

export const useUrlContext = () => useContext(urlContext);

export function UrlProvider({ applicationStructure, children }) {
  const [url, setUrl] = useUrl();
  const documentTitle = useRef(document.title);
  const structure = useRef(convertStructureToRegex());
  const toContext = {
    structure: structure.current,
    setUrl,
    url,
    documentTitle: documentTitle.current,
  }

  function convertStructureToRegex() {
    return applicationStructure.map(path => buildPathRegexTemplate(path, false));
  }

  function validateUrl() {
    for (const path of structure.current) if (url.path.match(path)) return true;
    return false;
  }

  return (
    <urlContext.Provider value={toContext}>
      {validateUrl()
        ? children
        : <PageNotFound />}
    </urlContext.Provider>);
}

UrlProvider.propTypes = {
  applicationStructure: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
}



export function ControllerLink(props) {
  const urlContext = useUrlContext();
  const currentPathContext = useContext(urlCurrentPathContext);

  const search = useRef(props.search || "");

  // Resolves path. Calculates one for a "go back" thingie,
  // or maps pathContext.path to urlContext.path if relative path specified
  const path = useMemo(() => {
    function buildPath(path) {
      if (!path) return;
      if (path.startsWith("/")) return path;
      return extractPathByMask(urlContext.url.path, currentPathContext.path) + path;
    }
    if (props.path !== "<<<") return buildPath(props.path);
    if (window.history.state?.referer) { // "<<<" case
      search.current = window.history.state.referer.search ?? search.current;
      return window.history.state.referer.path ?? buildPath(props.fallback) ?? "#";
    }
    return buildPath(props.fallback) ?? "#";
  }, [currentPathContext.path, props.fallback, props.path, urlContext.url.path]);

  // Builds current className, adopting from two possible prop modificators
  const className = useMemo(() => {
const result = [];
    if (props.className) result.push(props.className);
    if (comparePaths(urlContext.url.path, path)) result.push("matchUrl");
    if (comparePaths(urlContext.url.path, path, true)) result.push("exactMatchUrl");
    return result.join(" ") || undefined;
  }, [path, props.className, urlContext.url.path])

  function onClick(event) {
    event.preventDefault();
    if (path === "#") {
      event.stopPropagation();
      return false;
    }
    if (urlContext.url.path !== path || urlContext.url.search !== search.current) {
      urlContext.setUrl({ path, search: search.current, historyAction: props.historyAction });
    }
  }

  if (props.hideable && path === "#") return;
  return (
    <a onClick={onClick} className={className} href={process.env.PUBLIC_URL + path + search.current}>
      {props.children}
    </a>
  );
}

ControllerLink.propTypes = {
  path: PropTypes.string.isRequired,
  search: PropTypes.string,
  fallback: PropTypes.string,
  className: PropTypes.string,
  historyAction: PropTypes.string,
  hideable: PropTypes.bool,
  children: PropTypes.node,
}


export function urlAssociated(params, WrappedComponent) {
  if (typeof params === "string") params = { slug: params };
  params = {
    slug: "",
    index: false,
    expansive: false,
    ...params,
  }

  const compareObjects = (A, B) => {
    if (!A || !B) return false;
    const keysA = Object.keys(A);
    const keysB = Object.keys(B);
    if (keysA.length !== keysB.length) return false;
    return !keysA.some(key => A[key] !== B[key]);
  };

  return props => {
    const outerPathContext = useContext(urlCurrentPathContext);
    const urlContext = useUrlContext();
    const path = (outerPathContext.path === "/" ? "" : outerPathContext.path) + (params.index ? "" : ("/" + params.slug));
    const pathTemplate = useRef(buildPathRegexTemplate(path, params.expansive));
    const urlParams = useRef(undefined);
    const newUrlParams = parsePathByTemplate(pathTemplate.current);
    if (!compareObjects(urlParams.current, newUrlParams)) { // Added this to prevent excessive urlParams update
      urlParams.current = newUrlParams;
    }
    if (!urlParams.current) return; // <- Here we cut out all components, that doesn't comply current url
    // Ensures that document has the most recent title relevant to current url
    updateDocumentTitle(urlContext.documentTitle, extractPathByMask(urlContext.url.path, path), urlContext.url.search);
    return (
      <urlCurrentPathContext.Provider value={{ path }}>
          <Suspense fallback={<MySpinner />}>
            <ErrorBoundary FallbackComponent={ErrorHandler}>
              <WrappedComponent {...props} urlParams={urlParams.current} />
            </ErrorBoundary>
          </Suspense>
      </urlCurrentPathContext.Provider>
    );
  }
}

export function importUrlAssociated(params, path) {
  return urlAssociated(params, lazy(() => import(/* webpackChunkName: "[request]" */`../${path}`)));
}




//-------------------------------- Services -----------------------------------



function getUrlPath() {
  return window.location.pathname.substring((process.env.PUBLIC_URL || "").length);
}

function getUrlSearch() {
  return window.location.search;
}

function useUrl() {
  const [url, setUrl] = useReducer(urlReducer, { path: getUrlPath(), search: getUrlSearch() });

  function urlReducer(oldUrl, { path = oldUrl.path, search = oldUrl.search, historyAction = "push" }) {
    const newurl = window.location.protocol + "//" + window.location.host + (process.env.PUBLIC_URL || "") + path + search;
    //process.env.PUBLIC_URL
    if (historyAction === "push") {
      window.history.pushState({
        referer: window.history.state?.current,
        current: { path, search }
      }, "", newurl);
    }
    if (historyAction === "replace") {
      window.history.replaceState(window.history.state, "", newurl);
    }
    return { path, search };
  }

  useEffect(() => {
    function handleHistoryChange () {
      setUrl({ path: getUrlPath(), search: getUrlSearch(), historyAction: "skip" });
    };
    window.addEventListener('popstate', handleHistoryChange);
    return () => window.removeEventListener("popstate", handleHistoryChange);
  }, []);

  return [url, setUrl];
}

function updateDocumentTitle(title, path, search) {
  if (path.startsWith("/")) path = path.substring(1);
  if (path.endsWith("/")) path = path.substring(0, path.length - 1);
  if (path !== "") title = title + " | " + path;
  document.title = title + search;
}

function buildPathRegexTemplate(path, expansive) {
  return "^" + path
    .replace(/\/:([a-zA-Z0-9_]+)/g, (_, name) => `/(?<${name}>[a-zA-Z0-9_]+)`) //substitute every parameter to template
    .replaceAll("/", "\\/") // escape /
    + (expansive ? ".*" : "")
    + "\\/?$";
}

function extractPathByMask(currentPath, mask) {
  mask = mask
    .replace(/\/\*$/, "")
    .replace(/\/:([a-zA-Z0-9_]+)/g, "/[a-zA-Z0-9_]+")
    .replaceAll("/", "\\/");
  return currentPath.match(mask)[0] + "/";
}

function parsePathByTemplate(template, path = getUrlPath()) {
  const test = new RegExp(template).exec(path);
  return test && { ...test.groups || {}, search: getUrlSearch() };
}

function comparePaths(sample, comparant, exactMatch) {
  if (sample.at(-1) !== "/") sample += "/";
  if (comparant.at(-1) !== "/") comparant += "/";
  if (exactMatch) return sample === comparant;
  return sample.startsWith(comparant);
}

function ErrorHandler({error}) {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  )
}
