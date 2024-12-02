// import React, {useState, useEffect } from 'react'
// import "./Nav.css"

// function Nav() {
//   const [show,handleShow] = useState(false)

//   useEffect(() =>{
//     window.addEventListener("scroll",() =>{
//       if (window.scrollY >100){
//         handleShow(true);
//       }else handleShow(false);
//     });
//     return ()=> {
//       window.removeEventListener("scroll");
//     };
//   }, []);
//   return (
//     <div className='nav'>
//         <img 
//         className='nav_logo'
//         src="https://latestlogo.com/wp-content/uploads/2024/01/jiocinema-logo.png" 
//         alt="Logo" />
//         <img 
//         className='nav_left'
//         src="https://m.media-amazon.com/images/I/41rlGgMU2tL.png" 
//         alt="Logo" />
      
//     </div>
//   )
// }

// export default Nav



//https://img.freepik.com/premium-vector/cute-smiley-robot-illustration-vector-icon-mascotflat-cartoon-design-style_461200-205.jpg

// gpt code
import React, { useState, useEffect } from 'react';
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img 
        className='nav_logo'
        src="https://latestlogo.com/wp-content/uploads/2024/01/jiocinema-logo.png" 
        alt="Logo" 
      />
      
      <img 
        className='nav_left'
        src="https://m.media-amazon.com/images/I/41rlGgMU2tL.png" 
        alt="User Icon" 
      />
    </div>
  );
}

export default Nav;
