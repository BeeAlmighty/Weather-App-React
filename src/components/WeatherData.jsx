import React, { useContext } from 'react';
import { Details } from './Details';
import { myContext } from '../App';
import { WiHumidity } from "react-icons/wi";
import { GiWindSlap } from "react-icons/gi";
import { WiCloudyGusts } from "react-icons/wi";
import { GiPressureCooker } from "react-icons/gi";

export const WeatherData = () => {
  const {data, isDark} = useContext(myContext);
  const time = new Date();
  const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = {
    month: months[time.getMonth()],
    day: daysOfTheWeek[time.getDay()],
    date: time.getDate()
  }
  const tempInCelsius = data.main.temp - 273;
  const humidity = data.main.humidity;
  const description = data.weather[0].description;
  const location = data.name;
  const wind = data.wind.speed;
  const windGust = data.wind.gust;
  const pressure = data.main.pressure;
  const code = data.weather[0].icon;
  return (
    <div className='bg-sky-900 p-[1rem] flex gap-[1rem] flex-col min-[1000px]:flex-row rounded-lg min-[1000px]:p-[3rem] max-w-[70rem]'>
      <div className={`flex flex-col gap-[1rem] p-[1rem] rounded-md  ${isDark ? 'bg-black/75 text-white' : 'bg-gray-300 text-black'}`}>
        <p className='text-gray-600 flex gap-1.5 text-[1.4rem] min-[1000px]:flex-col min-[1000px]:text-3xl'>
          <span className='shadow-text'>{date.day}</span> {date.date} {date.month}
        </p>
        <p className='min-[1000px]:flex flex-col gap-1.5 min-[1000px]:text-3xl'>
          <span>{location}</span>
          {' '}
           <span>
              WEATHER FORECAST
            </span>
        </p>
      </div>
      <div className='grid gap-[1rem] min-[600px]:grid-cols-2 min-[1000px]:grid-cols-3'>
        <Details value={`${tempInCelsius.toFixed(1)} ˚C`} description={description} image={<img src={`https://openweathermap.org/img/wn/${code}@2x.png`} alt="icon" />}/>
        <Details value={`${humidity.toFixed(1)} %`} description={'Humidity'} image={<WiHumidity style={{color: 'skyblue', fontSize: '2rem'}}/>}/>
        <Details value={`${wind.toFixed(1)} m/s`} description={'Wind'} image={<GiWindSlap style={{color: 'blue', fontSize: '2rem'}}/>}/>
        <Details value={`${pressure.toFixed(1)} hpa`} description={'Pressure'} image={<GiPressureCooker style={{color: 'ed5c54', fontSize: '2rem'}}/>}/>
        <Details value={`${windGust.toFixed(1)} m/s`} description={'Wind Gust'} image={<WiCloudyGusts style={{fontSize: '2rem', color: '0cbdee'}} />}/>
      </div>
    </div>
  )
}
