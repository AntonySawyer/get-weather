import React from 'react';
import './geoPicker.css';

export default (props) => {
  return (
    <section className="geoPicker">
      <p><i className="fas fa-map-marked-alt"></i> {props.cityName}</p>
      <div className="joinInput">
        <input type="text" id="locationSearch" placeholder="Or type..." />
        <button onClick={() => props.handleInput('cityName', '#locationSearch')}><i className="fas fa-search-location"></i></button>
      </div>
      <button onClick={props.getCity}>Detect by IP</button>

      <button onClick={() => getLocation()}>Detect by geoposition</button>
      <span id="alertGeo"></span>

    </section>
  )
}



    
function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    let x = document.getElementById("alertGeo");
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
function showPosition(position) {
  fetch(`https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?geoit=json`)
    .then(rs => rs.json())
    .then(data => console.log(data))
    .catch(error => {
      console.error(error);
      return null;
    });
  }