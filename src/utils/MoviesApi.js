class MoviesApi {
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
getMovies() {
    return fetch(`${this._url}`,{
        method: 'GET',
        headers: this._headers
    })
    .then(this._handleResponse)
 }
  }
  
//Создание api
export const moviesApi = new MoviesApi({
    url: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        "Content-Type": "application/json"
    }
  })