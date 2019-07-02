export default (unixDate) => {
  const date = new Date(unixDate);
  const parsedHours = date.getHours().toString();
  const hours = parsedHours.length === 2 ? parsedHours : `0${parsedHours}`;
  return `${hours}:${date.getMinutes()}`;
}
