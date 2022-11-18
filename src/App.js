import { useEffect, useState } from 'react';
import './App.css';
import clear from './pics/clear.jpg'
import cloudy from './pics/cloudy.jpg'
import overcast from './pics/overcast.jpg'
import rainy from './pics/rainy.jpg'
import snow from './pics/snow.jpg'


function App() {
const [place, setPlace] = useState("new york")
const [placeInfo, setPLaceInfo] = useState([])

useEffect(() =>{
  handleFetch();
}, []);

const handleFetch = () => {
  fetch(
  `http://api.weatherapi.com/v1/current.json?key=2df513de03074e7aa09122333221711&q=${place}&aqi=no`
  )
  .then((response) => response.json())
  .then((data) => setPLaceInfo({
    name : data.location.name,
    country : data.location.country,
    farenheit: {
      current: data.current.temp_f
    },
    condition: data.current.condition.text
  }));
}
console.log(placeInfo)
  return (
    <div className="App" style={
      placeInfo.condition?.toLowerCase() === "clear" ||
      placeInfo.condition?.toLowerCase() === "sunny"
        ? { backgroundImage: `url(${clear})` }
        : placeInfo.condition?.includes("cloudy")
        ? { backgroundImage: `url(${cloudy})` }
        : placeInfo.condition?.toLowerCase().includes("rainy")
        ? { backgroundImage: `url(${rainy})` }
        : placeInfo.condition?.toLowerCase().includes("snow")
        ? { backgroundImage: `url(${snow})` }
        : { backgroundImage: `url(${overcast})` }
    } >
   <div className='search-input'>
   <input type = "text" value = {place} onChange ={ (e) => setPlace(e.target.value)
     }/>
     <button className='button' onClick = {handleFetch} >search</button>
   </div>
   <div className="weather-container">
        <div className="top-part">
          <h1>{placeInfo.farenheit?.current}° F</h1>
          <div className="condition-high-low">
            <h1>{placeInfo.condition}</h1>
          </div>
        </div>
        <h2>
          {placeInfo.name}, {placeInfo.country}
        </h2>
      </div>
    </div>
  );
}

export default App;
