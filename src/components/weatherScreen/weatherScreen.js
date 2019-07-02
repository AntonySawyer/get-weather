import React from 'react';
import './weather.css';

export default (props) => {
  return (
    <section className="weatherWrap">
      <p>
        <i className="fas fa-thermometer-half"></i>
        <span className="weatherText temperature">Temperature - {props.weather[0]}℃</span>
      </p>
      <p>
        <i className="fas fa-bars"></i>
        <span className="weatherText">Pressure - {props.weather[1]} hPa</span>
      </p>
      <p>
        <i className="fas fa-sun"></i>
        <span className="weatherText">Sunrise - {props.weather[2]} (UTC+3)</span>
      </p>
      <p>
        <i className="fas fa-cloud-moon"></i>
        <span className="weatherText">Sunset - {props.weather[3]} (UTC+3)</span>
      </p>
      <p>
        <i className="fas fa-cloud"></i>
        <span className="weatherText">Sky - {props.weather[4]}</span>
      </p>
    </section>
  )
}
