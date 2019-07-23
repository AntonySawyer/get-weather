import React from 'react';
import './geoPicker.css';

export default (props) => {
  return (
    <section className="geoPicker">
      <p>{props.cityName}</p>
      <button onClick={props.getCity}>Autodetect</button>
      <div className="joinInput">
        <button onClick={() => props.handleInput('cityName', '#locationSearch')}>Go!</button>
        <input type="text" id="locationSearch" placeholder="Or type..." />
      </div>
    </section>
  )
}
