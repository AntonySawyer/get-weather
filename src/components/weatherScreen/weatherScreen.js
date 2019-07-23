import React from 'react';
import './weather.css';

export default (props) => {
  return (
    <section className="weatherWrap">
      <p>
        <span className="weatherText temperature">{props.weather[0]} ℃</span>
      </p>
      <p>
        <span className="weatherText">{props.weather[4]}</span>
      </p>
      <p>
        <span className="weatherText">Pressure - {props.weather[1]} hPa</span>
      </p>
      <p>
        <span className="weatherText">Sunrise - {props.weather[2]} (UTC+3)</span>
      </p>
      <p>
        <span className="weatherText">Sunset - {props.weather[3]} (UTC+3)</span>
      </p>
    </section>
  )
}
