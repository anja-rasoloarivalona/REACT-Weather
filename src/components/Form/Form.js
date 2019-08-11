import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
    render() {
        return (
            <form onSubmit={this.props.getWeather}
                  className="form">
                <input type="text" name="city" placeholder="City..."/>
                <button type="submit">
                        Get Weather
                </button>
            </form>
        )
    }
}

export default Form;
