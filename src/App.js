import React, { Component } from 'react';
import './App.css';
import './Flag.css';


import Title from './components/Title/Title';
import Form from './components/Form/Form';

import ListCities from './components/ListCities/ListCities';
import SingleWeather from './components/SingleWeather/SingleWeather';






const API_KEY = '2287b09e1620e5a36dcd2833009015f0';

class App extends Component {

  state = {
    error: false,

    weather: undefined,
    listCities: undefined,

    city: undefined,
    country: undefined
  }


  componentDidMount(){
    this.getSingleWeather()
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/find?q=${city}&appid=${API_KEY}&units=metric`
    );
    let data = await api_call.json();
    if(city && data){
      this.setState({
        listCities: data.list,
        weather: undefined
      })
    }  
}

  getSingleWeather = async (data) => {

    let city, country;

    if(data){
      city = data.name;
      country = data.sys.country
    } else {
      city = 'Montreal';
      country = 'ca'
    }

    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country.toLowerCase()}&appid=${API_KEY}&units=metric`
    );
  let weatherData = await api_call.json();

   if(city && weatherData){
      this.setState({
        weather: weatherData,
        city: city,
        country: country,
        listCities: undefined
      }, () => {console.log('after fetch', this.state.weather)})
    }
  }


  render() {

   
    

    return (
      <div>
          <Title />
          <Form getWeather={this.getWeather}/>
          
          {
            this.state.listCities && (
                    <ListCities citiesFound={this.state.listCities}
                      requestCityWeather={this.getSingleWeather}/>
            )
          }

          {
            this.state.weather && (
                  <SingleWeather 
                    city={this.state.weather.name}
                    country={this.state.weather.sys.country}
                    temperature={this.state.weather.main.temp}
                    
                    description={this.state.weather.weather[0].description}
                    icon={this.state.weather.weather[0].icon}
                    
                    pressure={this.state.weather.main.pressure}
                    humidity={this.state.weather.main.humidity}
                    wind={this.state.weather.wind.speed}/>
            )
          }
          



         
       
      </div>
    )
  }
}


export default App;
