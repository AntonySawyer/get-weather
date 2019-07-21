export default () => {
  alert('Geolocation was denied by you or is not supported by this browser. We try detect city by IP.');
  fetch('https://api.ipify.org/?format=json')
    .then(rs => rs.json())
    .then(data => fetch(`https://ipapi.co/${data.ip}/json/`))
    .then(rs => rs.json())
    .then(data => {
      console.log([
        ['cityName', `${data.city},${data.country}`],
        ['longitude', `${data.longitude}`],
        ['latitude', `${data.latitude}`]]);
      return [
      ['cityName', `${data.city},${data.country}`],
      ['longitude', `${data.longitude}`],
      ['latitude', `${data.latitude}`]]})
    .catch(error => {
      console.error(error);
      return null;
    });
}