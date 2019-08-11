import React, {Fragment} from 'react';

const weather = props => {
    return (
        <div>
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