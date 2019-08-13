import React, { Component, Fragment } from 'react';
import './App.css';
import './Flag.css';


import Title from './components/Title/Title';
import Form from './components/Form/Form';
import ListCities from './components/ListCities/ListCities';
import SingleWeather from './components/SingleWeather/SingleWeather';

import Spinner from './components/Spinner/Spinner';

import Backdrop from './components/Backdrop/Backdrop';
import Modal from './components/Modal/Modal';






const API_KEY = '2287b09e1620e5a36dcd2833009015f0';

class App extends Component {

  state = {
    error: undefined,
    showBackdrop: false,

    weather: undefined,
    listCities: undefined,

    city: undefined,
    country: undefined,

    loading: false
  }


  componentDidMount(){
    this.getSingleWeather()
  }

  getWeather = async (e) => {
    this.setState({loading: true});

    e.preventDefault();
    const city = e.target.elements.city.value
    const api_call = await fetch(
      `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/find?q=${city}&appid=${API_KEY}&units=metric`
    );
    let data = await api_call.json();

    console.log(data);



    if(city && data){

      if(data.count > 1 ){
        this.setState({
          listCities: data.list,
          weather: undefined,
          loading: false
        })
      } else {
         
        if(data.count === 1) {
          this.setState({
            weather: data.list[0],
            listCities: undefined,
            loading: false
          })
        } else {
         this.setState({
              loading: false,
              error: 'Please enter a valid city name'
          })
        }

      }

      
    }  
}

  getSingleWeather = async (data) => {
    this.setState({ loading: true});

    let city, country;

    if(data){
      city = data.name;
      country = data.sys.country
    } else {
      city = 'Montreal';
      country = 'ca'
    }

    const api_call = await fetch(
      `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country.toLowerCase()}&appid=${API_KEY}&units=metric`
    );
  let weatherData = await api_call.json();

   if(city && weatherData){
      this.setState({
        weather: weatherData,
        city: city,
        country: country,
        listCities: undefined,
        loading: false
      })
    } else {
      this.setState({ loading: false})
    }
  }

  onCloseModal = () => {
    this.setState({
      error: undefined,
      showBackdrop: false
    })
  }


  render() {

   
    let data;

    if(this.state.loading){
      data = <Spinner />
    } else {
      data = (
        <Fragment>
          {
            this.state.error && (
              <Backdrop open={this.state.showBackdrop} 
                        onClick={this.onCloseModal} >
                        
                  <Modal onCloseModal={this.onCloseModal}>
                      <p>{this.state.error}</p>
                  </Modal>
              </Backdrop>
            )
          }
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
        </Fragment>
      )
    }

    return (
      <div>
          <Title />
          <Form getWeather={this.getWeather}/>
          {data}
                  
      </div>
    )
  }
}


export default App;
