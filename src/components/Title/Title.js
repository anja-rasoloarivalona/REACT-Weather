import React from 'react';
import './Title.css';
import logo from '../../assets/logo.png';

const title = ()  => {
    return (
        <div className="title">
            <div>
                <img src={logo} alt='logo' className="title__logo"/>
                <h1 className="title--primary">Weather Finder</h1>
            </div>
            
            <p className="title--secondary">Powered by Openweathermap</p>    
        </div>
    )
}

export default title
