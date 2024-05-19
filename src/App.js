import React, { useState } from "react";

const api = {
  key: "4ef4a58c2d6324fa309907d9e8ff0d56",
  baseUrl: "https://api.openweathermap.org/data/2.5"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    console.log(query)
    if(evt.key ==="Enter"){
      fetch(`${api.baseUrl}/weather?q=${query}&units=Metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      })
    }
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(weather.main && weather.main.temp) ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Your City..."
            className="search-bar"
            onChange={e=> setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(weather.name) ? (
        <div>
          <div className="location-box">
            <div className="location"> {weather.name}, {weather['sys'].country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div><div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ):(<div>Data not found</div>)}

      </main>
    </div>
  );
}

export default App;
