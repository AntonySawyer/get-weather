import React from 'react';

import * as Provider from './utils/credentials';
import processData from './utils/processData';
import needUpdate from './utils/needUpdate';
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
    const currTime = Date.now();
    const cityFromStorage = localStorage.getItem('cityName');
    if (needUpdate(currTime) || cityFromStorage === 'unavailable') {
      this.getCity();
    } else {
      this.storeValues([
        ['cityName', cityFromStorage],
        ['weather', localStorage.getItem('weather').split(',')]
      ]);
    }
    this.storeValues([['lastLogin', currTime]]);
  }

  getCity() {
    this.storeValues([
      ['cityName', '???'],
      ['weather', new Array(5).fill('?')]
    ]);
    fetch('https://api.ipify.org/?format=json')
      .then(rs => rs.json())
      .then(data => {
        fetch(`https://ipapi.co/${data.ip}/json/`)
          .then(rs => rs.json())
          .then(data => {
            this.storeValues([['cityName', `${data.city},${data.country}`]]);
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
        this.storeValues([['weather', newWeather]]);
      })
      .catch(error => {
        console.error(error);
        this.storeValues([
          ['cityName', 'unavailable'],
          ['weather', new Array(5).fill('?')]
        ]);
        return null;
      });
  }

  storeValues(arr) {
    const saveToLocal = ['weather', 'provider', 'cityName', 'lastLogin'];
    arr.forEach(pair => {
      this.state[pair[0]] && this.setState({ [pair[0]]: pair[1] });
      if (saveToLocal.includes(pair[0])) {
        localStorage.setItem(pair[0], pair[1]);
      }
    });
  }

  handleInput(key, selector) {
    this.storeValues([
      ['weather', new Array(5).fill('?')]
    ]);
    const el = document.querySelector(selector);
    this.storeValues([[key, el.value]]);
    if (key === 'provider') {
      this.getWeather(el.value);      
    } else {
      this.getWeather(this.state.provider, el.value);
      el.value = '';
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Header cityName={this.state.cityName} 
          handleInput={this.handleInput.bind(this)} 
          provider={this.state.provider} 
          getCity={this.getCity.bind(this)} />
        <main>
          <WeatherScreen weather={this.state.weather} />
        </main>
      </div>
    )
  }  
}
