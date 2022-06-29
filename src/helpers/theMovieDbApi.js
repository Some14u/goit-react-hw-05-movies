import { useEffect, useState } from "react";

class TheMovieDbApi {
  url = "https://api.themoviedb.org/3/";
  cache = {};
  configuration = { // Default values just in case
    images: {
      base_url: "http://image.tmdb.org/t/p/",
      secure_base_url: "https://image.tmdb.org/t/p/",
      backdrop_sizes: [
        "w300",
        "w780",
        "w1280",
        "original"
      ],
      logo_sizes: [
        "w45",
        "w92",
        "w154",
        "w185",
        "w300",
        "w500",
        "original"
      ],
      poster_sizes: [
        "w92",
        "w154",
        "w185",
        "w342",
        "w500",
        "w780",
        "original"
      ],
      profile_sizes: [
        "w45",
        "w185",
        "h632",
        "original"
      ],
      still_sizes: [
        "w92",
        "w185",
        "w300",
        "original"
      ],
    },
  };
  imgUrl;
  posterPath;
  portraitPath;
  DESIRED_POSTER_SIZE = { width: 240, height: 356 };
  DESIRED_PORTRAIT_SIZE = { width: 100, height: 150 };
  parameters = {};

  constructor() {
    this.loadConfiguration();
  }


  fetchData(path, parameters = {}) {
    const params = "?" + new URLSearchParams({ ...this.parameters, ...parameters, api_key: process.env.REACT_APP_SEARCH_KEY });

    const controller = new AbortController();
    const signal = controller.signal;

    const promise = new Promise(async (resolve) => {
      const request = this.url + path + params;
      if (this.cache[request]) {
        resolve(this.cache[request]);
        return;
      }
      const response = await window.fetch(request, { signal });
      const data = await response.json();
      this.cache[request] = data;
      resolve(data);
    });
    promise.cancel = () => controller.abort();
    return promise;
  }

  // Searches the closest possible tag name that comform with the given width and height
  findBestTag(list, { width = 0, height = 0 }) {
    if (width + height === 0) return "original";

    let closest = { w: 0, h: 0 };

    list.filter(item => item.startsWith("w"))
      .map(item => Number.parseInt(item.substring(1))).sort((a, b) => b - a)
      .forEach(item => {
        if (closest.w === 0 || (item > width && Math.abs(width - item) < Math.abs(width - closest.w))) closest.w = item;
      });

    list.filter(item => item.startsWith("h")).sort((a, b) => b - a)
      .map(item => Number.parseInt(item.substring(1)))
      .forEach(item => {
        if (closest.h === 0 || (item > height && Math.abs(height - item) < Math.abs(height - closest.h))) closest.h = item;
      });
    return Math.abs(height - closest.h) < Math.abs(width - closest.w) ? "h" + closest.h : "w" + closest.w;
  }

  loadConfiguration() {
    this.fetchData("configuration").then(data => this.configuration = { ...this.configuration, ...data });
    this.buildImageUrls();
  }

  buildImageUrls() {
    this.imgUrl = this.configuration.images.secure_base_url;
    this.posterPath = this.findBestTag(this.configuration.images.poster_sizes, this.DESIRED_POSTER_SIZE) + "/";
    this.portraitPath = this.findBestTag(this.configuration.images.profile_sizes, this.DESIRED_PORTRAIT_SIZE) + "/";
  }

  getTodayTrendingMovies() {
    return this.fetchData("trending/movie/day");
  }

  getMovieDetailsById(id) {
    return this.fetchData("movie/" + id);
  }

  getReviews(id) {
    return this.fetchData(`movie/${id}/reviews`);
  }

  getCast(id) {
    return this.fetchData(`movie/${id}/credits`);
  }

  searchMoviesByName(query) {
    return this.fetchData("search/movie", { query });
  }
}


export function useMovieDbFetcher(action, param) {
  const [data, setData] = useState(undefined);
  useEffect(() => {
    const getDataPromise = theMovieDbApi["get" + action](param);
    getDataPromise.then(data => setData(() => data?.success === false ? undefined : data));
    return () => getDataPromise.cancel();
  }, [action, param]);
  return data;
}



export const theMovieDbApi = new TheMovieDbApi();
