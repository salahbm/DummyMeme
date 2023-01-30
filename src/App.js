import { createContext, useEffect, useState } from "react";
import "./App.css";
import { insta, moon, sun, topArrow } from "./assets";
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
      content: icon.content === "Dark" ? "Light" : "Dark",
      icon: icon.content === "Dark" ? sun : moon,
    });
  }

  return (
    <DataContext.Provider value={{ btnClick, icon, isNight }}>
      <div
        style={{
          background: isNight ? "white" : "gray",
          padding: 10,
          overflow: "auto",
        }}
      >
        <Header />

        <Body />
        {showButton && (
          <div
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              zIndex: "100",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a
                href="https://www.instagram.com/im._.salah/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={insta}
                  alt="up"
                  style={{
                    height: 30,
                    width: 30,
                    marginBottom: 4,
                  }}
                ></img>
              </a>
            </div>
            <img
              src={topArrow}
              alt="up"
              onClick={scrollToTop}
              style={{
                height: 40,
                width: 40,
              }}
            ></img>
          </div>
        )}
      </div>
    </DataContext.Provider>
  );
}

export default App;
