const { ApolloServer, gql } = require('apollo-server')
const GenresData= require("./data/genres.json")
const MoviesData= require("./data/movies.json")

const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    vote_average: Float,
    genre_ids : String,
    genre : [Genre]
  }


  type Genre {
    id: ID
    name: String
  }

  type Query {
    movies: [Movie]
    movie(id: ID): Movie
    genres : [Genre]
    genre(id: ID) : Genre
  }
`

const resolvers = {
  Query: {
    movies: () => MoviesData.map(movie => {
      let genreValue = movie.genre_ids ? `[${movie.genre_ids}]` : null
      let result = { ...movie, genre_ids: genreValue }
      return result
    }),
    movie: (_, { id }) => {
      return MoviesData.find(movie => movie.id == id)
    },
    genres : (root,args,context) => GenresData,
    genre : (root,args,context) => {
      return GenresData.find(genre => genre.id == args.id)
    }
  },
  Movie :{
    genre: ({genre_ids}) => {
      if (genre_ids){
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
  resolvers
})

server.listen().then(data => console.log(`server started at port ${data.port}`))