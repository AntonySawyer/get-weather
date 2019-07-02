import timeConvert from './timeConvert';

export default (data, provider) =>{
  let temp, pressure, sunrise, sunset, sky;
  switch (provider) {
    case 'wb':
      temp = data.data[0].temp;
      pressure = data.data[0].pres;
      sunrise = data.data[0].sunrise;
      sunset = data.data[0].sunset;
      sky = data.data[0].weather.description;
      break;
    case 'owm':
      temp = data.main.temp;
      pressure = data.main.pressure;
      sunrise = timeConvert(data.sys.sunrise * 1000);
      sunset = timeConvert(data.sys.sunset * 1000);
      sky = data.weather[0].description;
      break;
    default:
      break;
  }
  return [temp, pressure, sunrise, sunset, sky];
}