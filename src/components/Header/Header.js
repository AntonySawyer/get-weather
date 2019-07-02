import React from 'react';

import GeoPicker from '../geoPicker/geoPicker';
import ProviderPicker from '../providerPicker/providerPicker';
import './header.css';

export default (props) => {
  return (
    <header>
      <GeoPicker cityName={props.cityName} handleInput={props.handleInput} getCity={props.getCity} />
      <ProviderPicker default={props.provider} handleInput={props.handleInput} />
    </header>
  )
}
