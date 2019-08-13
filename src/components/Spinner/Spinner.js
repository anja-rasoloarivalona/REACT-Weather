import React from 'react';
import './Spinner.css';

const spinner = () => {
    return (
        <div className="spinner">
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        
    )
}

export default spinner;
