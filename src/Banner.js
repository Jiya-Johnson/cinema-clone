import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './requests'; 
import "./Banner.css"

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                setMovie(
                    request.data.results[
                        Math.floor(Math.random() * request.data.results.length)
                    ]
                );
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    console.log(movie);

    function truncate(str,n){
        return str?.length > n ? str.substr(0, n-1) + "...": str;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner_contents">
                <h1 className='banner_title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">Fav</button>
                </div>
                <p className="banner_description">
                    {truncate(movie?.overview ,150)}
                </p>
            </div>
            <div className='banner__fadeBottom'/>
        </header>
    );
}

export default Banner;

//new code gpt 26nov;slideshow
// import React, { useState, useEffect } from "react";
// import Slider from "react-slick"; // Import React Slick
// import axios from "./axios";
// import requests from "./requests";
// import "./Banner.css";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";

// function Banner() {
//     const [movies, setMovies] = useState([]);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const request = await axios.get(requests.fetchNetflixOriginals);
//                 setMovies(request.data.results); // Store multiple movies
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         }
//         fetchData();
//     }, []);

//     const bannerSettings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 3000,
//     };

    

//     function truncate(str, n) {
//         return str?.length > n ? str.substr(0, n - 1) + "..." : str;
//     }

//     return (
//         <div className="banner-container">
           
//             <Slider {...bannerSettings} className="banner-carousel">
//                 {movies.map((movie) => (
//                     <header
//                         key={movie.id}
//                         className="banner"
//                         style={{
//                             backgroundSize: "cover",
//                             backgroundImage: `url(
//                                 "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
//                             )`,
//                             backgroundPosition: "center center",
//                         }}
//                     >
//                         <div className="banner_contents">
//                             <h1 className="banner_title">
//                                 {movie?.title || movie?.name || movie?.original_name}
//                             </h1>
//                             <div className="banner_buttons">
//                                 <button className="banner_button">Play</button>
//                                 <button className="banner_button">Fav</button>
//                             </div>
//                             <p className="banner_description">
//                                 {truncate(movie?.overview, 150)}
//                             </p>
//                         </div>
//                         <div className="banner__fadeBottom" />
//                     </header>
//                 ))}
          

            
//                 </Slider> 
//             </div>
        
//     );
// }

// export default Banner;
