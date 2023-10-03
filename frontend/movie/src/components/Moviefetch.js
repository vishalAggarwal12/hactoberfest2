import React, { useState } from "react";

const MovieFetch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movieData, setMovieData] = useState(null); // State to store movie data

  const submitFormHandler = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        searchQuery
      )}&api_key=665b1fb7c3697a49e8d4ed8c838c009d`;

      const options = {
        method: "GET",
      };

      const response = await fetch(apiUrl, options);
      const result = await response.json();

      // Set the movie data in the state
      setMovieData(result.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ alignItems: "center", justifyContent: "center" }}>
      <form
        style={{ display: "flex", flexDirection: "column", width: 500 }}
        onSubmit={submitFormHandler}
      >
        <label>Search Any Movie</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {movieData && (
        <div>
          <h1>{movieData.title}</h1>
          <h3>{movieData.overview}</h3>
          {/* Add more elements to display other movie data */}
        </div>
      )}
    </div>
  );
};

export default MovieFetch;
