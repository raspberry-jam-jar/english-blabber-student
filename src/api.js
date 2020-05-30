class BlabberAPI {
  apiBase = process.env.REACT_APP_SERVER || '';

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    const response = await res.json();
    return response;
  }

  async postData(url, headers, body) {
    const res = await fetch(`${this.apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    // const response = await res.json();
    return res.ok;
  }

  getStatus(id) {
    return this.getResource(`status/${id}`);
  }

  postApply(id, name, surname) {
    return this.postData('apply/', {}, { code: id, first_name: name, last_name: surname });
  }
}

export default BlabberAPI;
