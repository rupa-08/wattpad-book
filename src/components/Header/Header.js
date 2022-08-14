//ES7
import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateProvider/stateProvider";
import { auth } from "../Firebase/Firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Wattpad-logo-vector.svg/1280px-Wattpad-logo-vector.svg.png"
        />
      </Link>
      <div className="header_search">
        <input className="headerSearchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className="header_nav">
        <Link to={!user && "/login"}>
          <div className="header_option" onClick={handleAuthentication}>
            <span className="headerOptionOne">
              Hello, {!user ? "Guest" : user.email}
            </span>
            <span className="headerOptionTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <div className="header_option">
          <span className="headerOptionOne">Return</span>
          <span className="headerOptionTwo">& Order</span>
        </div>
        <div className="header_option">
          <span className="headerOptionOne">Your</span>
          <span className="headerOptionTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="shoppingBaketIcon">
            <ShoppingBasketIcon />
            <span className="headerOptionTwo headerBasketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
