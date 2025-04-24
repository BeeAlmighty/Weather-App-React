import React, { useState, createContext, useEffect } from 'react'
import { WeatherData } from './components/WeatherData'
import axios from 'axios';
import { TiWeatherStormy } from "react-icons/ti";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

export const myContext = createContext();
export const App = () => {
  const [data, setData] = useState();
  const [isDark, setIsDark] = useState(true);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null)
  const API_KEY = 'b5b3b76f543a9e6457db5fd94e040ae6';
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  
  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg(null)
    try{
      const response = await axios.get(BASE_URL);
      setIsLoading(false)
      setData(response.data)
    } catch(error){
      setIsLoading(false);
      setErrorMsg(error.response.data.message)
      setData('')
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setCity('')
    fetchData()
  }
  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }
  return (
    <div className={`font-Aboreto flex flex-col gap-[1rem] items-center justify-center py-[4rem] px-[1rem] ${isDark ? 'bg-black text-white' : 'bg-white text-black'} min-w-full min-h-full`}>
      <button className='border-1 border-gray-300 self-end bg-sky-800 rounded-full p-[0.25rem] cursor-pointer' onClick={toggleDarkMode}>
        {isDark ? <MdOutlineLightMode style={{fontSize: '1.5rem'}} /> : <MdOutlineDarkMode style={{fontSize: '1.5rem', color: 'white'}} />}
      </button>
      <h1 className={`text-[2.5rem] min-[700px]:text-[4rem ${isDark ? 'text-white' : 'text-black'} flex items-center gap-1.5`}>
        <span className='shadow-text'>WEA</span>
        THER APP 
        <TiWeatherStormy style={{color: '#ee8c0c'}}/>
      </h1>
      <form className='flex gap-3' onSubmit={handleSubmit}>
        <input 
          type="text"  
          value={city}
          placeholder='Enter your city'
          onChange={(e) => setCity(e.target.value)}
          className='border-1 rounded-lg px-[0.5rem] border-sky-300 bg-white text-black focus:border-sky-500 outline-none' 
        />
        <button className='bg-sky-600 w-[6rem] rounded-md cursor-pointer text-white py-[0.5rem]'>Search</button>
      </form>
      {isLoading ? (
        <span className="loader"></span>
      ) : (
        data ? (
          <myContext.Provider value={{data, isDark}}>
          <WeatherData />
        </myContext.Provider>
        ) : (
          ''
        )
      )}
      {errorMsg && 
        <div className='text-red-500'>
          <p>{errorMsg}</p> 
          <p>Please enter a valid city</p>
        </div>}
    </div>
  )
}