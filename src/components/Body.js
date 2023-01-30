import React, { useState, useContext, useEffect } from "react";
import { deleted, swap, topArrow, trollresult } from "../assets";

import { DataContext } from "../App";
const Body = () => {
  const { isNight } = useContext(DataContext);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [memeUrl, setMemeUrl] = useState("");
  const [memes, setMemes] = useState([]);
  const [hideAll, setHideAll] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState("");

  const handleTopTextChange = (event) => {
    setTopText(event.target.value);
  };

  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  const fetchMemes = async () => {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    setMemes(data.data.memes);
  };
  const clearBoxes = () => {
    setTopText("");
    setBottomText("");

    setMemeUrl("");
  };

  const handleClick = async (rmemeId) => {
    const API_KEY = "compcomp";
    const PASSWORD = "qwert123!";
    setSelectedMeme(rmemeId);
    if (topText && bottomText) {
      const apiUrl = `https://api.imgflip.com/caption_image?template_id=${rmemeId}&username=${API_KEY}&password=${PASSWORD}&text0=${topText}&text1=${bottomText}`;
      const imgResponse = await fetch(apiUrl);
      const imgData = await imgResponse.json();
      setMemeUrl(imgData.data.url);
    } else {
      setMemeUrl(memes.find((elem) => elem.id === rmemeId).url);
    }
  };
  const randomMeme = async () => {
    const API_KEY = "compcomp";
    const PASSWORD = "qwert123!";

    const randomMeme = memes[Math.floor(Math.random() * memes.length)];

    const apiUrl = `https://api.imgflip.com/caption_image?template_id=${randomMeme.id}&username=${API_KEY}&password=${PASSWORD}&text0=${topText}&text1=${bottomText}`;
    const imgResponse = await fetch(apiUrl);
    const imgData = await imgResponse.json();

    setMemeUrl(imgData.data.url);
  };
  useEffect(() => {
    fetchMemes();
  }, []);

  function downloadImage() {
    // Fetch the image from the URL
    fetch(memeUrl)
      .then((response) => {
        // Convert the response data into a blob
        response.blob().then((blob) => {
          // Create an object URL from the blob
          const url = URL.createObjectURL(blob);
          // Create a new anchor element
          const link = document.createElement("a");
          // Set the href and download properties of the anchor element
          link.href = url;
          link.download = "randomMeme.jpg";
          // Simulate a click on the anchor element
          link.click();
          // Revoke the object URL
          URL.revokeObjectURL(url);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //scroll to up

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="inputBoxes">
        <input
          className="inputtext"
          placeholder="top text"
          onChange={handleTopTextChange}
          value={topText}
          style={{ background: isNight ? "white" : "#A9A9A9" }}
        />
        <input
          className="inputtext"
          placeholder="bottom text"
          onChange={handleBottomTextChange}
          value={bottomText}
          style={{
            background: isNight ? "white" : "#A9A9A9",
          }}
        />
      </div>
      {topText && bottomText ? (
        <p
          style={{
            color: isNight ? "red" : "white",
            textAlign: "center",
          }}
        >
          share & tag me on IG {";)"}
        </p>
      ) : (
        <p
          style={{
            color: isNight ? "red" : "white",
            textAlign: "center",
          }}
        >
          Tip: enter the texts then choose the template {";)"}
        </p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",

          gap: "20px",
        }}
      >
        <button
          className="generatebtn"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 40,

            background: isNight ? "white" : "#A9A9A9",

            borderWidth: 0.5,
            height: 30,
          }}
          onClick={() => handleClick(selectedMeme)}
        >
          Generate this
          <img className="btnIcon" src={topArrow} alt="swap"></img>
        </button>
        <button
          className="generatebtn"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 40,

            background: isNight ? "white" : "#A9A9A9",

            borderWidth: 0.5,
            height: 30,
          }}
          onClick={() => randomMeme()}
        >
          random template
          <img src={swap} alt="swap" style={{ height: 20, width: 20 }}></img>
        </button>
      </div>
      {topText && bottomText ? (
        <div
          onClick={clearBoxes}
          style={{
            color: isNight ? "white" : "#A9A9A9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5 style={{ color: "black" }}>clear boxes</h5>
          <img className="deleteicon" src={deleted} alt="delete" />
        </div>
      ) : null}

      <div className="result-box">
        {memeUrl ? (
          <img
            src={memeUrl}
            alt="generated meme"
            className="generated-result"
          />
        ) : (
          <img
            className="generated-result"
            src={trollresult}
            alt="result img"
          ></img>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <button
          style={{
            textAlign: "center",
            borderRadius: 40,
            background: isNight ? "white" : "#A9A9A9",
            width: "30%",
            borderWidth: 0.5,
            height: 30,
          }}
          onClick={downloadImage}
        >
          Download
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <button
          style={{
            textAlign: "center",
            borderRadius: 40,
            background: isNight ? "white" : "#A9A9A9",
            width: "40%",
            borderWidth: 0.5,
            height: 35,
          }}
          onClick={() => setHideAll(!hideAll)}
        >
          Hide/Show Template
        </button>
      </div>

      {!hideAll ? (
        <div style={{ border: "1px solid black" }} className="grid-container">
          <h4
            style={{
              display: "flex",

              justifyContent: "center",
              alignItems: "center",
              color: isNight ? "black" : "#A9A9A9",
            }}
          >
            tap to copy id
          </h4>

          {memes.map((meme) => (
            <div id="memeContainer" className="memeContainer" key={meme.id}>
              <img
                className="allmemes"
                src={meme.url}
                alt={meme.name}
                onClick={() => {
                  handleClick(meme.id);
                  scrollToTop();
                }}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Body;
