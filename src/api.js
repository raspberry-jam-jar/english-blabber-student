class PersikApi {
  apiBase = 'https://desolate-island-09476.herokuapp.com/api/v1/';

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    const response = await res.json();
    return response;
  }

  getStatus(id) {
    return this.getResource(`status/${id}`);
  }
}

export default PersikApi;
