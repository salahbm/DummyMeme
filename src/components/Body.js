import React, { useState, useContext, useEffect } from "react";
import { deleted, trollresult } from "../assets";

// import { CopyToClipboard } from "react-copy-to-clipboard";
import { DataContext } from "../App";
const Body = () => {
  const { isNight } = useContext(DataContext);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [memeUrl, setMemeUrl] = useState("");
  const [memes, setMemes] = useState([]);
  const [hideAll, setHideAll] = useState(true);

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
  const handleClick = async (memId) => {
    const API_KEY = "compcomp";
    const PASSWORD = "qwert123!";

    // const randomMeme =
    //   data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
    if (topText && bottomText) {
      const apiUrl = `https://api.imgflip.com/caption_image?template_id=${memId}&username=${API_KEY}&password=${PASSWORD}&text0=${topText}&text1=${bottomText}`;
      const imgResponse = await fetch(apiUrl);
      const imgData = await imgResponse.json();
      setMemeUrl(imgData.data.url);
    }
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

  return (
    <div>
      <div>
        <div className="inputBoxes">
          <input
            className="inputtext"
            placeholder="top words"
            onChange={handleTopTextChange}
            value={topText}
            style={{ background: isNight ? "white" : "#A9A9A9" }}
          />
          <input
            className="inputtext"
            placeholder="bottom words"
            onChange={handleBottomTextChange}
            value={bottomText}
            style={{
              background: isNight ? "white" : "#A9A9A9",
            }}
          />
        </div>
        {topText && bottomText ? null : (
          <div>
            <p
              style={{
                color: isNight ? "red" : "white",
                textAlign: "center",
              }}
            >
              input the text!
            </p>
          </div>
        )}
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
      </div>
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
            width: "30%",
            borderWidth: 0.5,
            height: 30,
          }}
          onClick={() => setHideAll(!hideAll)}
        >
          Show Template
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
              {/* <CopyToClipboard text={setMemeId(meme.id)}> */}
              <img
                className="allmemes"
                src={meme.url}
                alt={meme.name}
                onClick={() => {
                  handleClick(meme.id);
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
