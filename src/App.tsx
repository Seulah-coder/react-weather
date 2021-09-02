import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './App.css';
import { Weather } from './Weather';
import WeatherInfo from './WeatherInfo';

const has = (value:any): value is boolean => !!value;

const App: React.FC = () => {

  const [city, setCity] = useState<string>('London');

  const handleChange = (event:ChangeEvent<HTMLInputElement>): void => {
    setCity(event.target.value);
  }

  const handleSubmit = (event:FormEvent) => {
    event.preventDefault();
    getWeather(city);
  };


  const appId = '00f5969442f4b2204992782fb599d503';
  const baseUrl ='https://api.openweathermap.org/data/2.5/weather?q=';
  const suffix = '&units=metric&appid='+appId;

  const [weather, setWeather] = useState<Weather | null>(null);

  const getWeather = async (city: string): Promise<void> => {
    const response = await fetch(baseUrl + city + suffix, {
     
    });
    console.log(baseUrl + city + suffix);
    if (response.status === 200) {
      const jsonWeather = await response.json();
      const cityTemp: Weather = jsonWeather.main;
      cityTemp.city = jsonWeather.name;
      setWeather(cityTemp);
          
      console.log(jsonWeather);
    } else {
      setWeather(null);
    }
  }

  
  useEffect(()=> {
     getWeather(city);
  }, []);

  const [msgFromChild, setMsgFromChild] = useState('');
  const getMsgFromChild = (msg:string) => setMsgFromChild(msg);

  return (
    <>
    <div>
      <form onSubmit={handleSubmit}>
        <input type ="text" placeholder ="Enter city" onInput = {handleChange}/>
        <button type = "submit"> Get weather</button>
        <h2>City: {city}</h2>
       
      </form>
      {msgFromChild}
      {has(weather) ? (
        <WeatherInfo weather={weather} parentChannel = {getMsgFromChild}/>
      ):(
        <h2>No weather available</h2>
      )}
    </div>

    
    </>
  );
}

export default App;
