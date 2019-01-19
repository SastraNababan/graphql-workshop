const { ApolloServer, gql } = require('apollo-server')
const MoviesData = [
  {
    id: 1,
    "vote_average": 6.9,
    "title": "Aquaman",
    "genre_id": 28
  },
  {
    "id": 2,
    "vote_average": 6.6,
    "title": "Bumblebee",
    "genre_id": 16
  },
  {
    "id": 3,
    "title": "Dragon Ball Super: Broly",
    "vote_average": 7.3,
    "genre_id": 12
  }
]

const GenresData = [
  { "id": 28, "name": "Action" },
  { "id": 12, "name": "Adventure" },
  { "id": 16, "name": "Animation" },
  { "id": 35, "name": "Comedy" }
]


const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    vote_average: Float,
    genre_id : ID,  
    genre : Genre
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
    movies: () => MoviesData,
    movie: (_, { id }) => {
      return MoviesData.find(movie => movie.id == id)
    },
    genres: (obj) => GenresData,
    genre: (obj) => {
      return GenresData.find(genre => genre.id == obj.id)
    }
  },
  Movie: {
    genre: (obj) => GenresData.find(genre => genre.id == obj.genre_id)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(data => console.log(`server started at port ${data.port}`))