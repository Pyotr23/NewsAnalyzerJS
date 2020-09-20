export default class DataStorage{
  save = (item: string, value: any): void => {
    localStorage.setItem(item, JSON.stringify(value));
  }

  load = (item: string): any => JSON.parse(<string>localStorage.getItem(item));
}
