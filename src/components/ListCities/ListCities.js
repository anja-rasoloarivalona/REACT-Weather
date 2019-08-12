import React from 'react';
import './ListCities.css';

const listCities = props => {
    return (
        <div className="list__cities">      
       {
           props.citiesFound.length > 0 && props.citiesFound.map( city => {
             return (
               <div key={city.id}
                    className="city"
                    onClick={props.requestCityWeather.bind(this, city)}>

                  <div className="city__weather">
                      <div className="city__weather__img"               
                            style={{backgroundImage: `url("http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png")`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                      }} />
                       <p className="city__weather__desc">{city.weather[0].description}</p>
                  </div>

                  <div className="city__temp">
                      <p>{city.main.temp} &#8451;</p>
                  </div>

                  <div className="city__details">
                      <p className="city__details__name">{city.name}, {city.sys.country} <span className={`flag flag-${city.sys.country.toLowerCase()}`}></span></p>
                      <p className="city__details__data">From {city.main.temp_min} to {city.main.temp_max} &#8451;</p>
                      <p className="city__details__data">Lat: {city.coord.lat} - Long: {city.coord.lon}</p>
                  </div>                       
                  
               </div>
             )
           })
         }       

        </div>
    )
}

export default listCities;
