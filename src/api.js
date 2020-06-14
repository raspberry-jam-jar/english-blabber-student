class BlabberRestAPI {
  apiBase = `${process.env.REACT_APP_SERVER}/api/v1/`;

  // basic methods
  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    const response = await res.json();
    return response;
  }

  async getStatus(url, notErrorArray = []) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok && !notErrorArray.includes(res.status)) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return { code: res.status, body: res.json() };
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
    return this.getStatus(`vk_auth/${string}`, [400, 401, 403]);
  }

  postApply(id, name, surname) {
    return this.postData('apply/', { code: id, first_name: name, last_name: surname });
  }
}

export default BlabberRestAPI;
