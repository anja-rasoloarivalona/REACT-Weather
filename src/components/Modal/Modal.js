import React from 'react';
import './Modal.css';


const modal = props => 
    (
        <section className='modal'>
            <header className="modal__header">
                <h1>Oops, something went wrong</h1>
            </header>

            
            <div className="modal__body">{props.children}</div>


            <div className="modal__cta">
                <button onClick={props.onCloseModal}>
                    OK
                </button>
            </div>
        </section>
    )


export default modal