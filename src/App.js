import React from 'react';

import * as Provider from './utils/credentials';
import processData from './utils/processData';
import Header from './components/Header/Header';
import WeatherScreen from './components/weatherScreen/weatherScreen';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '???',
      provider: localStorage.getItem('provider') || 'owm',
      weather: new Array(5).fill('?')
    }
  }

  componentDidMount() {
    const cityFromStorage = localStorage.getItem('cityName');
    const timeFromStorage = localStorage.getItem('lastLogin');
    const currTime = Date.now();
    const timeDiff = (new Date(currTime) - new Date(Number(timeFromStorage))) / 1000 / 60 / 60;
    if (cityFromStorage === null || timeDiff > 2) {
      this.setState({ cityName: '???', weather: new Array(5).fill('?')})
      this.getCity();
    } else {
      this.setState({ cityName: cityFromStorage, weather: localStorage.getItem('weather').split(',') });
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

  getWeather(provider = this.state.provider, cityName = this.state.cityName) {
    const endpoint = (provider === 'owm') 
      ? `${Provider.owm.url}${cityName}${Provider.owm.apiKey}${Provider.owm.settings}`
      : `${Provider.wb.url}${cityName}${Provider.wb.apikey}`;
    fetch(endpoint)
      .then(rs => rs.json())
      .then(data => {
        const newWeather = processData(data, provider);
        this.setState({ weather: newWeather });
        this.setLocalStorage('weather', newWeather);
      });
  }

  changeProvider() {
    const target = document.querySelector('#providerPicker').value;
    this.setState({provider: target});
    this.setLocalStorage('provider', target);
    this.getWeather(target);
  }

  searchCity() {
    const newCity = document.querySelector('#locationSearch').value;
    this.setState({cityName: newCity});
    this.setLocalStorage('cityName', newCity);
    this.getWeather(this.state.provider, newCity);
  }

  render() {
    return (
      <div className="wrapper">
        <Header cityName={this.state.cityName} 
          onChange={this.changeProvider.bind(this)} 
          searchCity={this.searchCity.bind(this)} 
          provider={this.state.provider} />
        <main>
          <WeatherScreen weather={this.state.weather} />
        </main>
      </div>
    )
  }  
}
