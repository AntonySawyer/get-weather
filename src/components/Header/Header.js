import React from 'react';

import GeoPicker from '../geoPicker/geoPicker';
import ProviderPicker from '../providerPicker/providerPicker';

export default (props) => {
  return (
    <header>
      <GeoPicker cityName={props.cityName} />
      <ProviderPicker onChange={props.onChange} />
    </header>
  )
}
