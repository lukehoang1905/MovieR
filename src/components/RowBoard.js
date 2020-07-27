import React from "react";
import "./RowBoard.css";
const base_url = "https://image.tmdb.org/t/p/original/";
function RowBoard({ aMovie, isLarge }) {
  return (
    <>
      <a href="##" className="link">
        <img
          key={aMovie.id}
          className={`movie-container ${isLarge && "row-movieLarge"}`}
          src={`${base_url}${
            isLarge ? aMovie.poster_path : aMovie.backdrop_path
          }`}
          alt={aMovie.name}
        />
      </a>
    </>
  );
}

export default RowBoard;

// const url = `https://api.themoviedb.org/3/movie/${aMovie}/reviews?api_key=${API_KEY}`;
