(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(22)},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(2),c=a.n(o),i=(a(16),a(3)),l=a(4),u=a(5),s=a(7),d=a(6),p=a(8),h=a(9),m=(a(17),function(e){return r.a.createElement("section",{className:"geoPicker"},r.a.createElement("p",null,e.cityName),r.a.createElement("button",{onClick:e.getCity},"Autodetect"),r.a.createElement("div",{className:"joinInput"},r.a.createElement("button",{onClick:function(){return e.handleInput("cityName","#locationSearch")}},"Go!"),r.a.createElement("input",{type:"text",id:"locationSearch",placeholder:"Or type..."})))}),g=(a(18),function(e){return r.a.createElement("section",{className:"providerPicker"},r.a.createElement("label",{htmlFor:"providerPicker"},"Provider: "),r.a.createElement("select",{id:"providerPicker",onChange:function(){return e.handleInput("provider","#providerPicker")},defaultValue:e.provider},r.a.createElement("option",{value:"owm"},"Open Weather Map"),r.a.createElement("option",{value:"wb"},"WeatherBit")))}),w=(a(19),function(e){var t=e.provider,a=e.handleInput,n=Object(h.a)(e,["provider","handleInput"]);return r.a.createElement("header",null,r.a.createElement(m,Object.assign({handleInput:a},n)),r.a.createElement(g,Object.assign({handleInput:a},t)))}),f=(a(20),function(e){return r.a.createElement("section",{className:"weatherWrap"},r.a.createElement("p",null,r.a.createElement("span",{className:"weatherText temperature"},e.weather[0]," \u2103")),r.a.createElement("p",null,r.a.createElement("span",{className:"weatherText"},e.weather[4])),r.a.createElement("p",null,r.a.createElement("span",{className:"weatherText"},"Pressure - ",e.weather[1]," hPa")),r.a.createElement("p",null,r.a.createElement("span",{className:"weatherText"},"Sunrise - ",e.weather[2]," (UTC+3)")),r.a.createElement("p",null,r.a.createElement("span",{className:"weatherText"},"Sunset - ",e.weather[3]," (UTC+3)")))}),v={url:"https://api.openweathermap.org/data/2.5/weather?",apiKey:"&appid=51835371b1252869b2e89700df1cdbba",settings:"&units=metric"},y={url:"https://api.weatherbit.io/v2.0/current?",apikey:"&key=51b2268802424671a8d742c3c2e15eaf"},E=function(e,t){switch(t){case"wb":var a=e.data[0];return[a.temp,a.pres,a.sunrise,a.sunset,a.description];case"owm":return[e.main.temp,e.main.pressure,b(e.sys.sunrise),b(e.sys.sunset),e.weather[0].description];default:return["?","?","?","?","?"]}},b=function(e){return new Date(1e3*e).toTimeString().split(":").filter(function(e){return 2===e.length}).join(":")},N=(a(21),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(d.a)(t).call(this,e))).getCity=function(){a.storeValues([["cityName","???"],["weather",new Array(5).fill("?")]]);navigator.geolocation.getCurrentPosition(function(e){a.storeValues([["latitude",e.coords.latitude],["longitude",e.coords.longitude]]),a.getWeather()},function(){alert("Geolocation was denied by you or is not supported by this browser. We try detect city by IP."),fetch("https://api.ipify.org/?format=json").then(function(e){return e.json()}).then(function(e){return fetch("https://ipapi.co/".concat(e.ip,"/json/"))}).then(function(e){return e.json()}).then(function(e){a.storeValues([["longitude","".concat(e.longitude)],["latitude","".concat(e.latitude)]]),a.getWeather()}).catch(function(e){return console.error(e),null})})},a.getEndpoint=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a.state.provider,t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t?"owm"===e?"".concat(v.url,"q=").concat(t).concat(v.apiKey).concat(v.settings):"".concat(y.url,"city=").concat(t).concat(y.apikey):"owm"===e?"".concat(v.url,"&lat=").concat(a.state.latitude,"&lon=").concat(a.state.longitude).concat(v.apiKey).concat(v.settings):"".concat(y.url,"&lat=").concat(a.state.latitude,"&lon=").concat(a.state.longitude).concat(y.apikey)},a.getWeather=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a.state.provider,t=arguments.length>1?arguments[1]:void 0,n=a.getEndpoint(e,t);fetch(n).then(function(e){return e.json()}).then(function(t){var n=E(t,e);a.storeValues([["weather",n],["cityName","owm"===e?"".concat(t.name,", ").concat(t.sys.country):"".concat(t.data[0].city_name,", ").concat(t.data[0].country_code)],["latitude","owm"===e?t.coord.lat:t.data[0].lat],["longitude","owm"===e?t.coord.lon:t.data[0].lon]])}).catch(function(e){return console.error(e),a.storeValues([["cityName","unavailable"],["weather",new Array(5).fill("?")]]),null})},a.storeValues=function(e){var t=["weather","provider","cityName","lastLogin","longitude","latitude"];e.forEach(function(e){a.setState(Object(i.a)({},e[0],e[1])),t.includes(e[0])&&localStorage.setItem(e[0],e[1])})},a.handleInput=function(e,t){var n=document.querySelector(t),r=n.value;""!==r&&(a.storeValues([["weather",new Array(5).fill("?")],[e,r]]),"provider"===e?a.getWeather(r):(a.getWeather(a.state.provider,r),n.value=""))},a.state={cityName:"???",provider:localStorage.getItem("provider")||"owm",weather:new Array(5).fill("?"),latitude:localStorage.getItem("latitude")||"",longitude:localStorage.getItem("longitude")||""},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=Date.now(),t=localStorage.getItem("cityName");!function(e){var t=Number(localStorage.getItem("lastLogin"));return(new Date(e)-new Date(t))/1e3/60/60>2}(e)&&"unavailable"!==t?this.storeValues([["cityName",t],["weather",localStorage.getItem("weather").split(",")]]):this.getCity(),this.storeValues([["lastLogin",e]])}},{key:"render",value:function(){return r.a.createElement("div",{className:"wrapper"},r.a.createElement(w,{cityName:this.state.cityName,handleInput:this.handleInput,provider:this.state.provider,getCity:this.getCity}),r.a.createElement("main",null,r.a.createElement(f,{weather:this.state.weather})))}}]),t}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[10,1,2]]]);
//# sourceMappingURL=main.7cf6894c.chunk.js.map