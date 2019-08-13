import React, { Component } from 'react'
import './SingleWeather.css';


const API_KEY = '2287b09e1620e5a36dcd2833009015f0';


class SingleWeather extends Component {

    state = {
        weather: {}
    }


    componentWillMount = async () =>{
        const api_call = await fetch(
            `http://api.openweathermap.org/data/2.5/forecast?q=${this.props.city},${this.props.country.toLowerCase()}&appid=${API_KEY}&units=metric`
          );
        let weatherData = await api_call.json();

        if(this.props.city && this.props.country){
            this.setState({
                weather: weatherData
            }, () => console.log('from single weather forecast', this.state.weather))
        }
      
    }


    render() {
        let image = require(`../../assets/weather/${this.props.icon}.jpg`)

    return (

        <div 
            className="single-weather__container"
            style={{
                    backgroundImage: `url(${image})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
            }}>
        
            {
                this.props.city && this.props.country && (
                <section className="single-weather">
                    <p className="single-weather__city">{this.props.city},  {this.props.country}</p> 

                    <div className="single-weather__main">
                            <p className="single-weather__main__temperature">{Math.round(this.props.temperature)} &#176;</p> 
                            <div className="single-weather__main__img"               
                                style={{backgroundImage: `url("http://openweathermap.org/img/wn/${this.props.icon}@2x.png")`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover"
                            }}/>
                            <p className="single-weather__main__desc">{this.props.description}</p>
                    </div>
                   <div className="single-weather__details">
                        <p>Pressure: {this.props.pressure} hPa</p>
                        <p>Humidity: {this.props.humidity} %</p>
                        <p>Wind: {this.props.wind} m/s</p>
                   </div>
                    
                    
                </section>
                ) 
            }
            
        </div>
    )
    }
}


export default SingleWeather;