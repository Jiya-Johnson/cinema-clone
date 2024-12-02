
// import React, { useEffect, useState } from 'react';
// import axios from './axios'; 
// import "./Row.css"
// import Youtube from  "react-youtube"

// const base_url = "https://image.tmdb.org/t/p/original";

// function Row({ title, fetchUrl,isLargeRow }) {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     // Function to fetch movies
//     async function fetchData() {
//       // try {
//         const request = await axios.get(fetchUrl);
//         setMovies(request.data.results); // Assuming the API response contains 'results'
//       // } catch (error) {
//       //   console.error('Error fetching movies:', error);
//       // }
//     }

//     fetchData();
//   }, [fetchUrl]);

//   console.table(movies); 

  
//   return (
//     <div className='row'>
//       <h2>{title}</h2>
//       <div className='row_posters'>
//         {movies.map(movie => (
//            <img 
//            key={movie.id}
//            className={`row_poster ${isLargeRow && "row_posterLarge" }`}
//            src={`${base_url}${
//             isLargeRow ? movie.poster_path: movie.backdrop_path
//           }`} 
//           alt={movie.name} 
//           />
//         ))}
//       </div>
//       {/* <YouTube videoId={trailerUrl} opts={opts} /> */}
//     </div>
//   );
// }

// export default Row;

//now using


//sample gpt code to test
// import React, { useEffect, useState } from "react";
// import axios from "./axios";
// import "./Row.css";
// import YouTube from "react-youtube";
// import movieTrailer from "movie-trailer"; 
// const base_url = "https://image.tmdb.org/t/p/original";

// function Row({ title, fetchUrl, isLargeRow }) {
//   const [movies, setMovies] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState(""); 

//   useEffect(() => {
//     async function fetchData() {
//       const request = await axios.get(fetchUrl);
//       setMovies(request.data.results);
//     }
//     fetchData();
//   }, [fetchUrl]);

//   const handleClick = (movie) => {
//     if (trailerUrl) {
//       setTrailerUrl(""); 
//     } else {
//       movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
//         .then((url) => {
//           const urlParams = new URLSearchParams(new URL(url).search);
//           setTrailerUrl(urlParams.get("v")); // Extract YouTube video ID
//         })
//         .catch((error) => console.error("Trailer not found:", error));
//     }
//   };

//   const opts = {
//     height: "390",
//     width: "100%",
//     playerVars: {
//       autoplay: 1,
//     },
//   };

//   return (
//     <div className="row">
//       <h2>{title}</h2>
//       <div className="row_posters">
//         {movies.map((movie) => (
//           <img
//             key={movie.id}
//             onClick={() => handleClick(movie)}
//             className={`row_poster ${isLargeRow && "row_posterLarge"}`}
//             src={`${base_url}${
//               isLargeRow ? movie.poster_path : movie.backdrop_path
//             }`}
//             alt={movie.name}
//           />
//         ))}
//       </div>
//       {/* Render YouTube video only if a trailer URL is available */}
//       {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
//     </div>
//   );
// }

// export default Row;


//22 nov code without trailer code
import React, { useEffect, useState } from 'react';
import axios from './axios'; // Custom axios instance
import YouTube from 'react-youtube'; // Import react-youtube
import movieTrailer from 'movie-trailer'; // Import movie-trailer for fetching trailer URLs
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(""); // State for the trailer URL

  useEffect(() => {
    // Fetch movies
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results); // Assuming API response has 'results'
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchData();
  }, [fetchUrl]); // Dependency on fetchUrl

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1, // Auto-play videos
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl && trailerUrl === movie.id) {
      setTrailerUrl(""); // Close the trailer if the same movie is clicked again
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v")); // Extract 'v' parameter for video ID
        })
        .catch((error) => console.error('Error finding trailer:', error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name || movie.title || movie.original_name}
            onClick={() => handleClick(movie)} // Attach click handler to each image
          />
        ))}
      </div>
      {/* Render YouTube component conditionally */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;

