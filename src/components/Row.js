import React, { useState, useEffect } from "react";

import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";
// /movie/{movie_id}/reviews

function Row({ title, fetchUrl, isLarge }) {
  const [movies, setMovies] = useState(null);
  const [moviesDetail, setMoviesDetail] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  if (movies === null) {
    return "loading...";
  }

  //   console.log(movies);
  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row-container">
        {movies.map((aMovie) => (
          <img
            key={aMovie.id}
            className={`movie-container ${isLarge && "row-movieLarge"}`}
            src={`${base_url}${
              isLarge ? aMovie.poster_path : aMovie.backdrop_path
            }`}
            alt={aMovie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
