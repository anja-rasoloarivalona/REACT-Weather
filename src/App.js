import React, { Component } from 'react';
import './App.css';
import Title from './components/Title/Title';
import Form from './components/Form/Form';
import SingleWeather from './components/SingleWeather/SingleWeather';
import flag from './assets/country-flags/svg/001-ethiopia.svg';


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
       
         
      </div>
    )
  }
}


export default App;
