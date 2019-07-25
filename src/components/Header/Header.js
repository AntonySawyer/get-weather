import React from 'react';

import GeoPicker from '../geoPicker';
import ProviderPicker from '../providerPicker';
import './header.css';

export default (props) => {
  const { provider, handleInput, ...geoProps} = props;
  return (
    <header>
      <GeoPicker handleInput={handleInput} { ...geoProps} />
      <ProviderPicker handleInput={handleInput} {...provider} />
    </header>
  )
}
