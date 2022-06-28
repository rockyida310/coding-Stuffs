import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg">Coding</span>
        <span className="headerTitleSm">&Stuffs</span>
      </div>
      <img
        className="headerImg"
        src="https://images.pexels.com/photos/12310403/pexels-photo-12310403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt=""
      />
    </div>
  );
};

export default Header;
