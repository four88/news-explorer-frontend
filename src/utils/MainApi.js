class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }


  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Error: ${res.statusText}`)
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name })
    })
      .then((res) => this._checkResponse(res))
  }

  login(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    })
      .then((res) => this._checkResponse(res))
  }

  checkUserToken(token) {
    return fetch(`${this._baseUrl}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  getSaveArticle(token) {
    return fetch(`${this._baseUrl}/article`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res))
  }

  deleteSaveArticle(articleId, token) {
    return fetch(`${this._baseUrl}/article/${articleId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`
      },
    }).then((res) => this._checkResponse(res))
  }

  saveArticle({
    keyword, title, text, date, source, link, image,
  }, token) {
    return fetch(`${this._baseUrl}/article`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image
      })
    }).then((res) => this._checkResponse(res))
  }

}

const mainApi = new MainApi({
  baseUrl: `https://api.news-project.students.nomoredomainssbs.ru`
})

export default mainApi;
