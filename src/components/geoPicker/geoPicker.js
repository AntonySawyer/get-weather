import React from 'react';
import './geoPicker.css';

export default (props) => {
  return (
    <section className="geoPicker">
      <p><i className="fas fa-map-marked-alt"></i> {props.cityName}</p>
      <div className="joinInput">
        <input type="text" id="locationSearch" placeholder="Or type..." />
        <button onClick={() => props.searchCity()}><i className="fas fa-search-location"></i></button>
      </div>
    </section>
  )
}
