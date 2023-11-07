

import { Link, NavLink } from 'react-router-dom'

const Header = ({ isDarkMode, onToggleDarkMode }) => {
  const buttonTextContent = isDarkMode ? "Light Mode" : "Dark Mode";

  return (
    <header>
      <nav>
        <h1> The store </h1>
        <div className="navigation">

        <NavLink className="button" exact to="/">
            Login
        </NavLink>

        <NavLink className="button" exact to="/home">
            Home
        </NavLink>

        <NavLink className="button" exact to="/cart">
            Cart
        </NavLink>

        <NavLink className="button" exact to="/orders">
            Orders
        </NavLink>

        <NavLink className="button" exact to="/about">
            About
        </NavLink>


        </div>
      </nav>
    </header>
  );
};

export default Header;