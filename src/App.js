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

    weather: {},

    listCities: []
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
        listCities: data.list
      })
    }  
}

  getSingleWeather = async (data) => {
  
  const city = data.name;

  const country = data.sys.country

  const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country.toLowerCase()}&appid=${API_KEY}&units=metric`
    );
  let weatherData = await api_call.json();

    
   if(city){
      this.setState({
        weather: weatherData
      }, () => {console.log('after fetch', this.state.weather)})
    }
  }


  render() {

    

    return (
      <div>
          <Title />
          <Form getWeather={this.getWeather}/>
          

          <ListCities citiesFound={this.state.listCities}
                      requestCityWeather={this.getSingleWeather}/>



         
       
      </div>
    )
  }
}


export default App;
