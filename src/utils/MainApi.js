class MainApi {
    constructor(config) {
      // тело конструктора
      this._url = config.url;
      this._headers = config.headers
    }
  
     getUserProfile() {
        return fetch(`${this._url}/profile`,{
            method: 'GET',
            headers: this._headers
        })
        .then(this._handleResponse)
     }
     updateProfile(data) {
      return fetch(`${this._url}/profile`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        })
    })
    .then(this._handleResponse)
     }
  }
  
//Создание api
export const mainApi = new MainApi({
    url: 'https://sensi.movies.api.nomoredomains.rocks',
    headers: {
        "authorization": `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json"
    }
  })