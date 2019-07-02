export default (currTime) => {
  const timeFromStorage = Number(localStorage.getItem('lastLogin'));
  const timeDiff = (new Date(currTime) - new Date(timeFromStorage)) / 1000 / 60 / 60;
  return timeDiff > 2;
}