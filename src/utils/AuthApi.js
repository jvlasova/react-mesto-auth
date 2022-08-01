class authAPI {
  constructor(baseURL) {
    this._baseURL = baseURL;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  register = (email, password) => {
    return fetch(`${this._baseURL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._handleResponse);
  };

  authorize = (email, password) => {
    return fetch(`${this._baseURL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._handleResponse);
  };

  checkToken = (token) => {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(this._handleResponse)
    .then((data) => {
      localStorage.setItem('token', data.token);
    })
  };
}

const authApi = new authAPI("https://auth.nomoreparties.co");

export default authApi;
