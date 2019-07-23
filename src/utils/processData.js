export default (data, provider) => {
  switch (provider) {
    case 'wb':
      const wObj = data.data[0];
      return [wObj.temp, wObj.pres, wObj.sunrise, wObj.sunset, wObj.description ];
    case 'owm':
      return [data.main.temp, data.main.pressure, convTime(data.sys.sunrise), convTime(data.sys.sunset), data.weather[0].description];
    default:
      return ['?', '?', '?', '?', '?'];
  }
}

const convTime = unixDate => new Date(unixDate*1000).toTimeString().split(':').filter(i => i.length === 2).join(':');
