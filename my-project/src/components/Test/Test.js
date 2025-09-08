import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/WeatherForecast`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching:", err));
  }, [API_URL]);

  return (
    <div>
      <h1>Weather Forecast</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.date} - {item.temperatureC}°C ({item.summary})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
