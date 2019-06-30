import React from 'react';

export default (props) => {
  return (
    <select id="providerPicker" onChange={() => props.onChange()}>
      <option value="owm" defaultValue>Open Weather Map</option>
      <option value="wb">WeatherBit</option>
    </select>
  )
}
