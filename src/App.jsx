import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weatherData, setweatherData] = useState(null);
  const [loading, setloading] = useState(false);
  const [cityName, setcityName] = useState("Kolkata");

  useEffect(()=>{
    fetchData(cityName)
  },[])

  const fetchData = async (cityName) => {
    // if(cityName.trim().length() ===0 ) return
    setloading(true)
    const url = `http://api.weatherapi.com/v1/current.json?q=${cityName}&key=3076298addd44300898122748243012`;
    const response = await axios.get(url);
    if (response.status === 200) {
      setweatherData(response.data);
    } else {
      console.error("400");
    }
    setloading(false)
  };

  return ( loading || weatherData === null ? "Loading...":
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* Search Section */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter city name"
            value={cityName}
            onChange={(e) => setcityName(e.target.value)}
          />
          <div
            onClick={() => {
              fetchData(cityName);
            }}
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Search
          </div>
        </div>

        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">{`${weatherData.location.name} , ${weatherData.location.region}, ${weatherData.location.country}`}</h1>
          <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>

        {/* Main Weather Display */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-6xl font-bold">{weatherData.current.temp_f}°F</h2>
            <p className="text-lg capitalize">{weatherData.current.condition.text}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <p>Wind: {weatherData.current.wind_kph} kph</p>
              <p>Humidity: {weatherData.current.humidity}%</p>
              <p>UvIndex: {weatherData.current.uv}%</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
