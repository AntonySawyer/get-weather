import React from 'react';

import Header from './components/Header/Header';
import WeatherScreen from './components/weatherScreen/weatherScreen';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: localStorage.getItem('cityName'),
      provider: localStorage.getItem('provider') || 'owm',
      weather: localStorage.getItem('weather').split(',') || [0,0,0,0,0]
    }
  }

  componentDidMount() {
    const cityFromStorage = localStorage.getItem('cityName');
    const timeFromSorage = localStorage.getItem('lastLogin');
    const currTime = Date.now();
    const timeDiff = (new Date(timeFromSorage) - new Date(currTime)) / 1000 / 60 / 60;
    if (cityFromStorage === null || timeDiff > 2) {
      this.getCity();
    } else {
      this.setState({ cityName: cityFromStorage });
    }
    this.setLocalStorage('lastLogin', currTime);
  }

  setLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  getCity() {
    fetch('https://api.ipify.org/?format=json')
      .then(rs => rs.json())
      .then(data => {
        fetch(`https://ipapi.co/${data.ip}/json/`)
          .then(rs => rs.json())
          .then(data => {
            this.setState({ cityName: `${data.city},${data.country}` });
            this.setLocalStorage('cityName', `${data.city},${data.country}`);
          })
          .then(() => this.getWeather() )
          .catch(error => {
            console.error(error);
            return null;
          })
      });
  }

  getWeather(provider = this.state.provider) {
    const owmKey = '51835371b1252869b2e89700df1cdbba';
    const wbKey = '51b2268802424671a8d742c3c2e15eaf'
    const endpoint = provider === 'owm' 
      ? `http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&appid=${owmKey}&units=metric`
      : `http://api.weatherbit.io/v2.0/current?city=${this.state.cityName}&key=${wbKey}`;
    fetch(endpoint)
      .then(rs => rs.json())
      .then(data => {
        this.processRS(data, provider);
      });
  }

  processRS(data, provider) {
    let temp, pressure, sunrise, sunset, sky;
    console.log(data);
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
        sunrise = data.sys.sunrise;
        sunset = data.sys.sunset;
        sky = data.weather[0].description;
      break;
      default:
        break;
    }
    const weatherRS = [temp, pressure, sunrise, sunset, sky];
    this.setState({ weather: weatherRS });
    this.setLocalStorage('weather', weatherRS);
  }

  changeProvider() {
    const target = document.querySelector('#providerPicker').value;
    this.setState({provider: target});
    this.setLocalStorage('provider', target);
    this.getWeather(target);
  }

  render() {
    return (
      <div className="wrapper">
        <Header cityName={this.state.cityName} onChange={this.changeProvider.bind(this)} />
        <WeatherScreen weather={this.state.weather} />
      </div>
    )
  }  
}
