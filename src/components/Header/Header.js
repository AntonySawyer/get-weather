import React from 'react';

import GeoPicker from '../geoPicker/geoPicker';
import ProviderPicker from '../providerPicker/providerPicker';
import './header.css';

export default (props) => {
  return (
    <header>
      <GeoPicker cityName={props.cityName} searchCity={props.searchCity} />
      <ProviderPicker default={props.provider} onChange={props.onChange} />
    </header>
  )
}
