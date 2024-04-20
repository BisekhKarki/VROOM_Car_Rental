import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from '../Datas'; // Importing Menu from Datas
import "../css/nav.css";

const Nav = () => {
  // Get the current location using useLocation hook from react-router-dom
  const location = useLocation();
  
  // Get the token from localStorage
  const token = localStorage.getItem('token');

  // State to store user info
  const [userInfo, setUserInfo] = useState({});

  // Function to handle user logout
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Reload the window to clear user session
    window.location.reload();
    // Alternative method to navigate to home page (if useNavigate hook is imported)
    // navigate('/');
  };

  // Function to fetch user data
  const userData = async () => {
    try {
      // Fetch user info from the backend API
      const response = await fetch('http://localhost:4000/user-info', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      // Parse response data
      const data = await response.json();
      // If request is successful, update userInfo state with user data
      if(data.success === true){
        setUserInfo(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch user data when component mounts
  useEffect(() => {
    userData();
  }, []);

  return (
    <div className='nav'>
      <nav className="navbaritem">
        <div className='logo-side'>
          <h2 className='navlogo'>Vroom</h2>
          {/* Display user's full name */}
          {userInfo && <h4 className='nav--user'>Welcome {userInfo.fullname}</h4>}
        </div>
        {/* Navigation menu */}
        <ul className='navmenu'>
          {/* Map through Menu items to generate navigation links */}
          {Menu.map((item, index) => (
            <li key={index} className={location.pathname === item.url ? "active" : ""}>
              <Link to={item.url} className={item.cName}>
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        {/* Link to user's requests page */}
        <Link to={`/Requests/${userInfo._id}`}>
          <h1 className='nav--button'>Request</h1>
        </Link>
        {/* Conditional rendering based on user authentication */}
        {token ? (
          <>
            {/* Display logout button if user is logged in */}
            <div>
              <button className='nav--button' onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          // Display login button if user is not logged in
          <div>
            <Link to={'/login'} className='nav-login'>
              <button className='nav--button'>
                Login
              </button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
