/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import axios from 'axios';

function WeatherApp(){

    const [weather,setWeather] = useState(null)
    const [error,setError] = useState(null)
    const apiKey = 'd612e60d26e26f50dfc269888436c0df';  // Replace with your API key
    const city = 'london';  

    useEffect(()=>{
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
                setWeather(response.data);
            } catch (err) {
                setError(err);
            }
        };
        fetchWeather();
    },[])

    if (error) return <div>Error: {"invalid API key"}</div>;
    if (!weather) return <div>Loading...</div>;

    return(
    <>
        <div>
            <h1>Weather in {weather.name}</h1>
            <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
        </div>

    </>
    )
}

export default WeatherApp;