import React, { useState, useEffect } from "react";

import "./App.css";
//setting up three pieces of state for the app. Adding london as initial state so user doesn't see a blank app when loaded
function App() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState("london");
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    ifClicked();
  }, []);
//a function that fetches data from the apis. What happens here is simply fetch data from the APIs, check if there is any problem via the catch and if-else statements, and also set the data that we will be needing to pieces of state.
  function ifClicked() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=94ff8f714e1192e407f6aa2ff130133a&units=metric`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status === 404) {
            return alert("Oops, there seems to be an error!(wrong location)");
          }
          alert("Oops, there seems to be an error!");
          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
      })
      .catch((error) => console.log(error));
      //fetch for photo api
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=ZkPeGlRpLo98c2xqP7jwxkJJ5fSpsQwkY6PMTM0WzsY`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));
  }
  //developing the UI for the app that will be rendered on screen
  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">Current Temparature: {weather?.main?.temp}</p>
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;