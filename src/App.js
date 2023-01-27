import { createContext, useEffect, useState } from "react";
import "./App.css";
import { moon, sun, topArrow } from "./assets";
import Body from "./components/Body";
import Header from "./components/Header";
export const DataContext = createContext();
function App() {
  const [isNight, setIsNight] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [icon, setIcon] = useState({
    content: "Dark",
    icon: moon,
  });
  // scroll up button
  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // Click Event.
  function btnClick() {
    setIsNight(!isNight);
    setIcon({
      content: icon.content === "Light" ? "Dark" : "Light",
      icon: icon.content === "Light" ? sun : moon,
    });
  }

  return (
    <DataContext.Provider value={{ btnClick, icon, isNight }}>
      <div
        style={{
          background: isNight ? "white" : "gray",
          padding: 10,
          height: "1005",
        }}
      >
        <Header />

        <Body />
        {showButton && (
          <img
            src={topArrow}
            alt="up"
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              zIndex: "100",
              height: 40,
              width: 40,
            }}
          ></img>
        )}
      </div>
    </DataContext.Provider>
  );
}

export default App;
