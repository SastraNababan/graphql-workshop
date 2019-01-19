const { RESTDataSource } = require('apollo-datasource-rest');

class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3';
  }

  // add api params to each request
  willSendRequest(request) {
    // TODO : set api key
    request.params.set('api_key', '4e911a064e43b9cd6fbb3137c572d89a');
  }

  async getMovies({ sort, page }) {
    // fetch & return movies
  }

  getMovieById(id) {
     // fetch & return movie by ID
  }

}

module.exports = MoviesAPI;
