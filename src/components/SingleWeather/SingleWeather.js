import React, {Fragment} from 'react';
import './SingleWeather.css';

const weather = props => {

    let image = require(`../../assets/weather/${props.icon}.jpg`)

    return (

        <div 
            className="single-weather"
            style={{
                    backgroundImage: `url(${image})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
            }}>
        
            {
                props.city && props.country && (
                <Fragment>
                    <p>Location: {props.city},  {props.country}</p> 
                    <p>Temperature: {props.temperature}</p> 
                    <p>Humidity: {props.humidity}</p>
                    <p>Conditions: {props.description}</p>
                </Fragment>
                ) 
            }
            
        </div>
    )
}


export default weather;