import React, { useContext } from "react";
import { troll } from "../assets";
import { DataContext } from "../App";
const Header = () => {
  const { icon, btnClick, isNight } = useContext(DataContext);

  return (
    <div>
      <nav className="navbar">
        <img className="troll" src={troll} alt="troll face"></img>
        <h1
          style={{
            color: isNight ? "white" : "#A9A9A9",
            textAlign: "center",
            fontFamily: "revert-layer",
          }}
        >
          Dummy Meme
        </h1>

        <img
          className="toggleBtn"
          src={icon.icon}
          alt="toggledIcon"
          onClick={btnClick}
        ></img>
      </nav>
    </div>
  );
};

export default Header;
