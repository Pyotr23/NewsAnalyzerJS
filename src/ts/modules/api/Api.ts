export default class Api{
  protected async http<T>(url: string, request?: RequestInit): Promise<T> {
    const response = await fetch(url, request)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json() as Promise<T>;
  }
}
