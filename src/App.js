import React, { Component } from 'react';
import './App.css';
import './Flag.css';


import Title from './components/Title/Title';
import Form from './components/Form/Form';
import SingleWeather from './components/SingleWeather/SingleWeather';






const API_KEY = '2287b09e1620e5a36dcd2833009015f0';

class App extends Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: false,



    citiesList: []
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value

    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/find?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();

    console.log(data)

    if(city){
      this.setState({
        citiesList: data.list
      })
    }
    
   /* if(city && country){
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description
      })
    }*/
    
  }


  render() {

    

    return (
      <div>
          <Title />
          <Form getWeather={this.getWeather}/>
          <SingleWeather temperature ={this.state.temperature}
                          city={this.state.city}
                          country={this.state.country}
                          humidity={this.state.humidity}
                          description={this.state.description}/>

      <div className="list__cities">      
       {
           this.state.citiesList.length > 0 && this.state.citiesList.map( city => {
             return (
               <div key={city.id}
                    className="city">

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
       
      </div>
    )
  }
}


export default App;
