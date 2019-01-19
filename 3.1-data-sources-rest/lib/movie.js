const { RESTDataSource } = require('apollo-datasource-rest');

class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3';
    this.sortBy = {
      POPULARITY: "popularity.desc",
      RELEASE_DATE: "release_date.desc"
    }
  }

  willSendRequest(request) {
    request.params.set('api_key', '0b1e1b44b83086672e9db1fd4a39c154');
  }

  async getMovies({ sort, page }) {
    const res = await this.get('/discover/movie', {
      params: { page, sortby: this.sortBy[sort] },
    });
    return res ? res.results : [];
  }

  async getMovieById(id) {
    let result = this.get(`movie/${id}`);
    return result
  }

}

module.exports = MoviesAPI;