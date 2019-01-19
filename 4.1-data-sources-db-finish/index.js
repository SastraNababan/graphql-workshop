const { ApolloServer, gql } = require('apollo-server')
const GenresData= require("./data/genres.json")
const MovieDataSource = require('./lib/movie');
const LikesDataSource = require('./lib/likes');
const isEmail = require('isemail');

const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    vote_average: Float,
    genre_ids : String,
    genre : [Genre],
    overview: String
    poster : String
  }

  type Genre {
    id: ID
    name: String
  }
  
  enum SORT_TYPE {
    POPULARITY
    RELEASE_DATE
  }
  
  type Query {
    movies(sort: SORT_TYPE, page: Int): [Movie]!
    movie(id: ID): Movie
    genres : [Genre]
    genre(id: ID) : Genre
  }

  type Mutation {
    toggleLike(id:ID,user:String):Movie
    login(email: String!): String
  }
  
`

const resolvers = {
  Query: {
    movies: (root, { sort, page = 1 }, { dataSources }) => {
      if (page > 1000)
        throw new Error('Page must be less than or equal to 1000');
      return dataSources.moviesAPI.getMovies({ sort: "POPULARITY", page: 1 });
    },
    movie: (_, { id },{dataSources}) => 
      dataSources.moviesAPI.getMovieById(id)
    ,
    genres: (root, args, context) => GenresData,
    genre: (root, args, context) => {
      return GenresData.find(genre => genre.id == args.id)
    }
  },
  Movie: {
    poster: (root) => `https://image.tmdb.org/t/p/w500/${root.poster_path}`,
    genre: ({ genre_ids }) => {
      if (genre_ids) {
        let ids = JSON.parse(genre_ids)
        return ids.map(id =>
          GenresData.find(genre => genre.id == id)
        )
      }
      return null
    }
  },
  Mutation: {
    toggleLike: async (root, { id }, { user, dataSources }) => {
      if (!user) throw new Error('You must be logged in to do this');
      await dataSources.likesAPI.toggleMovieLike({ id, user });
      return dataSources.moviesAPI.getMovieById(id);
    },
    login: (_, { email }) => new Buffer(email).toString('base64'),
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || '';
    const email = new Buffer(auth, 'base64').toString('ascii');
    return { user: isEmail.validate(email) ? email : null };
  },
  dataSources : () => ({
    moviesAPI : new MovieDataSource(),
    likesAPI: new LikesDataSource(),
  })
})

server.listen().then(data => console.log(`server started at port ${data.port}`))