import React, { Component } from 'react'
import './SingleWeather.css';


const API_KEY = '2287b09e1620e5a36dcd2833009015f0';

const WEEKDAY = new Array(7)

WEEKDAY[0] = "MON";
WEEKDAY[1] = "TUE";
WEEKDAY[2] = "WED";
WEEKDAY[3] = "THU";
WEEKDAY[4] = "FRI";
WEEKDAY[5] = "SAT";
WEEKDAY[6] =  "SUN";

class SingleWeather extends Component {

    state = {
        weather: undefined,
        forecast: undefined
    }


    componentDidMount = async () =>{
        const api_call = await fetch(
            `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${this.props.city},${this.props.country.toLowerCase()}&appid=${API_KEY}&units=metric`
          );
        let weatherData = await api_call.json();

        if(this.props.city && this.props.country){
        
            let results = [];

            /*List of forecasts for the coming days*/
            let data = weatherData.list;

            /* Keep the forecasts data where hour is equal to 12:00:00 and store them in newData */
            let newData = data.filter( i => {
              return i.dt_txt.slice(11) === '12:00:00'
            })
            
            /* Store the day (in weekday format), temperature and icon datas into the results array for each forecast remaining */
        
            newData .map( i => {
                    let test = i.dt_txt.slice(0, 10);
                    let newTest = (new Date(test)).getDay(); 

                    let dayInLetter = WEEKDAY[newTest];
                    let temp = Math.round(i.main.temp);
                    let icon = i.weather[0].icon;
                    
                    let forecastDataByDate = {
                        day: dayInLetter,
                        temp: temp,
                        icon: icon
                    }

                results = [...results, forecastDataByDate];
            
            })

            this.setState({
                weather: weatherData,
                forecast: results
            })
        }
      
    }


    render() {


        let image = require(`../../assets/weather/${this.props.icon}.jpg`)

        let forecast;

        if(this.state.forecast){
            let data = this.state.forecast;

            forecast = data.map( i => (
                <div className="single-weather__forecast"
                     key={i.day}>

                    <div className="single-weather__forecast__day">{i.day}</div>
                    <div className="single-weather__forecast__img"               
                            style={{backgroundImage: `url("http://openweathermap.org/img/wn/${i.icon}@2x.png")`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                      }} />
                    <div className="single-weather__forecast__temp" >
                        {i.temp} &#176;
                    </div>
                </div>
            ))
        }

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

                    <div className="single-weather__forecast__container">
                        {forecast} 
                    </div>
                          
                    
                    
                </section>
                ) 
            }
            
        </div>
    )
    }
}


export default SingleWeather;