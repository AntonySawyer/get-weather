import React from 'react';
import './weather.css';

export default (props) => {
  return (
    <section className="weatherWrap">
      <p>temperature - <span className="weatherText">{props.weather[0]}</span></p>
      <p>pressure - {props.weather[1]}</p>
      <p>sunrise - {props.weather[2]}</p>
      <p>sunset - {props.weather[3]}</p>
      <p>sky - {props.weather[4]}</p>
    </section>
  )
}
