/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import axios from 'axios';

function WeatherApp(){

    const [weather,setWeather] = useState(null)
    const [error,setError] = useState(null)
    const apiKey = 'd612e60d26e26f50dfc269888436c0df';  // Replace with your API key
    const [city,setCity] = useState(""); 
    


    useEffect(()=>{

        const fetchWeather = async () => {
            if (!city) {
                setWeather(null); // Reset weather data if input is empty
                return;
            }
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
                setWeather(response.data);
            } catch (err) {
                setError(err);
            }
        };
        fetchWeather();
    },[city])

    function handleCity(event){
        setCity(event.target.value)

    }

    

    
    
    return(
    <>
        <div>
            <input type='text' value={city} onChange={handleCity} placeholder='Enter city...'/>
            
            <h1>Weather in {city || 'N/A'}</h1>
            <p>Temperature: {weather ? `${Math.round(weather.main.temp - 273.15)}°C` : "null"}</p>
            <p>Condition: {weather ? weather.weather[0].description : "null"}</p>
        </div>

    </>
    )
}

export default WeatherApp;