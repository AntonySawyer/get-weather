import React from 'react';

import Header from '../Header';
import WeatherScreen from '../weatherScreen';

import * as Provider from '../../utils/credentials';
import processData from '../../utils/processData';
import needUpdate from '../../utils/needUpdate';
// import geoByIP from '../../utils/geoByIP';

import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '???',
      provider: localStorage.getItem('provider') || 'owm',
      weather: new Array(5).fill('?'),
      latitude: localStorage.getItem('latitude') || '',
      longitude: localStorage.getItem('longitude') || ''
    };
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

  getCity = () => {
    this.storeValues([
      ['cityName', '???'],
      ['weather', new Array(5).fill('?')]
    ]);
    const locationApprove = (position) => {
      this.storeValues([
        ['latitude', position.coords.latitude],
        ['longitude', position.coords.longitude]
      ]);
      this.getWeather();
    };
    const locationDenied = () => {
        alert('Geolocation was denied by you or is not supported by this browser. We try detect city by IP.');
        fetch('https://api.ipify.org/?format=json')
          .then(rs => rs.json())
          .then(data => fetch(`https://ipapi.co/${data.ip}/json/`))
          .then(rs => rs.json())
          .then(data => {
            this.storeValues([
              ['longitude', `${data.longitude}`],
              ['latitude', `${data.latitude}`]]);
            this.getWeather();
          })
          .catch(error => {
            console.error(error);
            return null;
          });
    }
    navigator.geolocation.getCurrentPosition(locationApprove, locationDenied);
  }

  getEndpoint = (provider = this.state.provider, cityName = false) => {
    if (cityName) {
      const endpoint = (provider === 'owm')
      ? `${Provider.owm.url}q=${cityName}${Provider.owm.apiKey}${Provider.owm.settings}`
      : `${Provider.wb.url}city=${cityName}${Provider.wb.apikey}`;
      return endpoint;
    } else {
      const endpoint = (provider === 'owm')
        ? `${Provider.owm.url}&lat=${this.state.latitude}&lon=${this.state.longitude}${Provider.owm.apiKey}${Provider.owm.settings}`
        : `${Provider.wb.url}&lat=${this.state.latitude}&lon=${this.state.longitude}${Provider.wb.apikey}`;
      return endpoint;
    }
  }

  getWeather = (provider = this.state.provider, cityName) => {
    const endpoint = this.getEndpoint(provider, cityName);
    fetch(endpoint)
      .then(rs => rs.json())
      .then(data => {
        const newWeather = processData(data, provider);
        this.storeValues([
          ['weather', newWeather], 
          ['cityName', provider === 'owm' ? `${data.name}, ${data.sys.country}` : `${data.data[0].city_name}, ${ data.data[0].country_code}`],
          ['latitude', provider === 'owm' ? data.coord.lat : data.data[0].lat],
          ['longitude', provider === 'owm' ? data.coord.lon : data.data[0].lon]
        ]);
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

  storeValues = (arr) => {
    const saveToLocal = ['weather', 'provider', 'cityName', 'lastLogin', 'longitude', 'latitude'];
    arr.forEach(pair => {
      this.setState({ [pair[0]]: pair[1] });
      if (saveToLocal.includes(pair[0])) {
        localStorage.setItem(pair[0], pair[1]);
      }
    });
  }

  handleInput = (key, selector) => {
    const el = document.querySelector(selector);
    const inputValue = el.value;
    if (inputValue !== '') {
      this.storeValues([
        ['weather', new Array(5).fill('?')],
        [key, inputValue]
      ]);
      if (key === 'provider') {
        this.getWeather(inputValue);
      } else {
        this.getWeather(this.state.provider, inputValue);
        el.value = '';
      }
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Header cityName={this.state.cityName}
          handleInput={this.handleInput}
          provider={this.state.provider}
          getCity={this.getCity} />
        <main>
          <WeatherScreen weather={this.state.weather} />
        </main>
      </div>
    )
  }
}
