import React from 'react';

import './providerPicker.css';

export default (props) => {
  return (
    <section className="providerPicker">
      <label htmlFor="providerPicker"><i className="fas fa-satellite-dish"></i> </label>
      <select id="providerPicker" onChange={() => props.onChange()} defaultValue={props.default}>
        <option value="owm">Open Weather Map</option>
        <option value="wb">WeatherBit</option>
      </select>
    </section>
  )
}