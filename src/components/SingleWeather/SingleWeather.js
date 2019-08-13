import React, { Component } from 'react'
import './SingleWeather.css';




class SingleWeather extends Component {

    render() {
        let image = require(`../../assets/weather/${props.icon}.jpg`)

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
                props.city && props.country && (
                <section className="single-weather">
                    <p className="single-weather__city">{props.city},  {props.country}</p> 

                    <div className="single-weather__main">
                            <p className="single-weather__main__temperature">{Math.round(props.temperature)} &#176;</p> 
                            <div className="single-weather__main__img"               
                                style={{backgroundImage: `url("http://openweathermap.org/img/wn/${props.icon}@2x.png")`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover"
                            }}/>
                            <p className="single-weather__main__desc">{props.description}</p>
                    </div>
                   <div className="single-weather__details">
                        <p>Pressure: {props.pressure} hPa</p>
                        <p>Humidity: {props.humidity} %</p>
                        <p>Wind: {props.wind} m/s</p>
                   </div>
                    
                    
                </section>
                ) 
            }
            
        </div>
    )
    }
}


export default SingleWeather;