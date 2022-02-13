class MainApi {
    constructor(config) {
      // тело конструктора
      this._url = config.url;
      this._headers = config.headers
    }
      //функция проверки ответа от сервера
  _handleResponse (res) {
    if (res.ok){ 
      return res.json() 
    } 
    return Promise.reject (`Ошибка: ${res.status}`)
}
register(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    })
    .then(this._handleResponse)
    .then((res) => {
      return res;
    }) 
  }; 
  
  login(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      })
    })
    .then(this._handleResponse)
    .then((res) => {
      return res;
    }) 
  }; 

  checkTokenValidity(token){
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
      })
    .then(this.handleResponse)
    .then((res) => {
        return res;
      }) 
    }
     getUserProfile() {
        return fetch(`${this._url}/users/me`,{
            method: 'GET',
            headers: this._headers
        })
        .then(this._handleResponse)
     }
     updateProfile(data) {
      return fetch(`${this._url}/users/me`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        })
    })
    .then(this._handleResponse)
     }
     createMovie(card) {
        return fetch(`${this._url}/movies`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                country: card.country,
                director: card.director,
                duration: card.duration,
                year: card.year,
                description: card.description,
                image: `https://api.nomoreparties.co/${card.image.url}`,
                trailer: card.trailerLink,
                nameRU: card.nameRU,
                nameEN: card.nameEN,
                thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
                movieId: card.id
              })
     })
     .then(this._handleResponse)
    }
    getMovies() {
        return fetch(`${this._url}/movies`,{
            method: 'GET',
            headers: this._headers,
     })
     .then(this._handleResponse)
    }
    removeMovie(id) {
        return fetch(`${this._url}/movies/${id}`,{
            method: 'DELETE',
            headers: this._headers,
     })
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