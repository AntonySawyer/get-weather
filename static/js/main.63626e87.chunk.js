(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,function(e,t,a){e.exports=a(21)},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(2),i=a.n(c),o=(a(15),a(3)),l=a(4),s=a(5),u=a(7),m=a(6),h=a(8),p="https://api.openweathermap.org/data/2.5/weather?q=",f="&appid=51835371b1252869b2e89700df1cdbba",d="&units=metric",w="https://api.weatherbit.io/v2.0/current?city=",v="&key=51b2268802424671a8d742c3c2e15eaf",y=function(e){var t=new Date(e),a=t.getHours().toString(),n=2===a.length?a:"0".concat(a);return"".concat(n,":").concat(t.getMinutes())},E=(a(16),function(e){return r.a.createElement("section",{className:"geoPicker"},r.a.createElement("p",null,r.a.createElement("i",{className:"fas fa-map-marked-alt"})," ",e.cityName),r.a.createElement("div",{className:"joinInput"},r.a.createElement("input",{type:"text",id:"locationSearch",placeholder:"Or type..."}),r.a.createElement("button",{onClick:function(){return e.handleInput("cityName","#locationSearch")}},r.a.createElement("i",{className:"fas fa-search-location"}))),r.a.createElement("button",{onClick:function(){return e.getCity()}},"Auto detect"))}),g=(a(17),function(e){return r.a.createElement("section",{className:"providerPicker"},r.a.createElement("label",{htmlFor:"providerPicker"},r.a.createElement("i",{className:"fas fa-satellite-dish"})," "),r.a.createElement("select",{id:"providerPicker",onChange:function(){return e.handleInput("provider","#providerPicker")},defaultValue:e.default},r.a.createElement("option",{value:"owm"},"Open Weather Map"),r.a.createElement("option",{value:"wb"},"WeatherBit")))}),N=(a(18),function(e){return r.a.createElement("header",null,r.a.createElement(E,{cityName:e.cityName,handleInput:e.handleInput,getCity:e.getCity}),r.a.createElement(g,{default:e.provider,handleInput:e.handleInput}))}),b=(a(19),function(e){return r.a.createElement("section",{className:"weatherWrap"},r.a.createElement("p",null,r.a.createElement("i",{className:"fas fa-thermometer-half"}),r.a.createElement("span",{className:"weatherText temperature"},"Temperature - ",e.weather[0],"\u2103")),r.a.createElement("p",null,r.a.createElement("i",{className:"fas fa-bars"}),r.a.createElement("span",{className:"weatherText"},"Pressure - ",e.weather[1]," hPa")),r.a.createElement("p",null,r.a.createElement("i",{className:"fas fa-sun"}),r.a.createElement("span",{className:"weatherText"},"Sunrise - ",e.weather[2]," (UTC+3)")),r.a.createElement("p",null,r.a.createElement("i",{className:"fas fa-cloud-moon"}),r.a.createElement("span",{className:"weatherText"},"Sunset - ",e.weather[3]," (UTC+3)")),r.a.createElement("p",null,r.a.createElement("i",{className:"fas fa-cloud"}),r.a.createElement("span",{className:"weatherText"},"Sky - ",e.weather[4])))}),k=(a(20),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={cityName:"???",provider:localStorage.getItem("provider")||"owm",weather:new Array(5).fill("?")},a}return Object(h.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=Date.now(),t=localStorage.getItem("cityName");!function(e){var t=Number(localStorage.getItem("lastLogin"));return(new Date(e)-new Date(t))/1e3/60/60>2}(e)&&"unavailable"!==t?this.storeValues([["cityName",t],["weather",localStorage.getItem("weather").split(",")]]):this.getCity(),this.storeValues([["lastLogin",e]])}},{key:"getCity",value:function(){var e=this;this.storeValues([["cityName","???"],["weather",new Array(5).fill("?")]]),fetch("https://api.ipify.org/?format=json").then(function(e){return e.json()}).then(function(t){fetch("https://ipapi.co/".concat(t.ip,"/json/")).then(function(e){return e.json()}).then(function(t){e.storeValues([["cityName","".concat(t.city,",").concat(t.country)]])}).then(function(){return e.getWeather()}).catch(function(e){return console.error(e),null})})}},{key:"getWeather",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.state.provider,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.state.cityName,n="owm"===t?"".concat(p).concat(a).concat(f).concat(d):"".concat(w).concat(a).concat(v);fetch(n).then(function(e){return e.json()}).then(function(a){var n=function(e,t){var a,n,r,c,i;switch(t){case"wb":a=e.data[0].temp,n=e.data[0].pres,r=e.data[0].sunrise,c=e.data[0].sunset,i=e.data[0].weather.description;break;case"owm":a=e.main.temp,n=e.main.pressure,r=y(1e3*e.sys.sunrise),c=y(1e3*e.sys.sunset),i=e.weather[0].description}return[a,n,r,c,i]}(a,t);e.storeValues([["weather",n]])}).catch(function(t){return console.error(t),e.storeValues([["cityName","unavailable"],["weather",new Array(5).fill("?")]]),null})}},{key:"storeValues",value:function(e){var t=this,a=["weather","provider","cityName","lastLogin"];e.forEach(function(e){t.state[e[0]]&&t.setState(Object(o.a)({},e[0],e[1])),a.includes(e[0])&&localStorage.setItem(e[0],e[1])})}},{key:"handleInput",value:function(e,t){this.storeValues([["weather",new Array(5).fill("?")]]);var a=document.querySelector(t);this.storeValues([[e,a.value]]),"provider"===e?this.getWeather(a.value):(this.getWeather(this.state.provider,a.value),a.value="")}},{key:"render",value:function(){return r.a.createElement("div",{className:"wrapper"},r.a.createElement(N,{cityName:this.state.cityName,handleInput:this.handleInput.bind(this),provider:this.state.provider,getCity:this.getCity.bind(this)}),r.a.createElement("main",null,r.a.createElement(b,{weather:this.state.weather})))}}]),t}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[9,1,2]]]);
//# sourceMappingURL=main.63626e87.chunk.js.map