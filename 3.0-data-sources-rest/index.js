/*
TODOs :
  - fetch movies from rest with apollo-datasource-rest
  - connect with data sources
  - refactor resolver
  - add new type & resolver for poster
*/

const { ApolloServer, gql } = require('apollo-server')
const GenresData= require("./data/genres.json")

const MovieDataSource = require('./lib/movie');


const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    vote_average: Float,
    genre_ids : String,
    genre : [Genre],
    # overview: String
    # poster : String
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
    # TODO : add arguments( sort, page)
    movies: [Movie]!
    movie(id: ID): Movie
    genres : [Genre]
    genre(id: ID) : Genre
  }
`

const resolvers = {
  Query: {
    movies: (obj, args, context, info) => {
      // TODO : connect movies resolver to datasources
    },

    movie: (_, { id },{dataSources}) => {
      // TODO : connect movie resolver to datasources
    },
    genres: (root, args, context) => GenresData,
    genre: (root, args, context) => {
      return GenresData.find(genre => genre.id == args.id)
    }
  },
  Movie: {
    genre: ({ genre_ids }) => {
      if (genre_ids) {
        let ids = JSON.parse(genre_ids)
        return ids.map(id =>
          GenresData.find(genre => genre.id == id)
        )
      }
      return null
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => null,
  // TODO : Add data source
})