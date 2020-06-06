class BlabberAPI {
  apiBase = process.env.REACT_APP_SERVER || '';

  // basic methods
  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    const response = await res.json();
    return response;
  }

  async getStatus(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    return res.status;
  }

  async postData(url, body) {
    const res = await fetch(`${this.apiBase}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return res.ok;
  }

  // app methods
  getAuth(string) {
    return this.getStatus(`vk_auth/${string}`);
  }

  postApply(id, name, surname) {
    return this.postData('apply/', {}, { code: id, first_name: name, last_name: surname });
  }
}

export default BlabberAPI;
