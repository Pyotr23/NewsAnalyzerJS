export default class DataStorage{
  save = (item, value) => {
    localStorage.setItem(item, JSON.stringify(value));
  }

  load = item => JSON.parse(localStorage.getItem(item));
}
