import React, { useState, useEffect } from "react";

import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const base_url = "https://image.tmdb.org/t/p/original/";
// /movie/{movie_id}/reviews

function Row({ title, fetchUrl, isLarge }) {
  const [movies, setMovies] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

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
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (aMovie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(aMovie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  //   console.log(movies);
  return (
    <div className="row">
      <h1 className="row-title">{title}</h1>
      <div className="row-container">
        {movies.map((aMovie) => (
          <img
            key={aMovie.id}
            onClick={() => handleClick(aMovie)}
            className={`movie-container ${isLarge && "row-movieLarge"}`}
            src={`${base_url}${
              isLarge ? aMovie.poster_path : aMovie.backdrop_path
            }`}
            alt={aMovie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
