import React from 'react';

import './providerPicker.css';

export default (props) => {
  return (
    <section className="providerPicker">
      <label htmlFor="providerPicker">Provider: </label>
      <select id="providerPicker" onChange={() => props.handleInput('provider', '#providerPicker')} defaultValue={props.provider}>
        <option value="owm">Open Weather Map</option>
        <option value="wb">WeatherBit</option>
      </select>
    </section>
  )
}