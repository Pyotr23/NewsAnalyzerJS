export default class Api{
  _get = async (path, requestParams) => {
    const url = new URL(path);
    url.search = new URLSearchParams(requestParams).toString();
    const res = await fetch(url);
    if (res.ok)
      return res.json();
    return Promise.reject(res);
  }
}
