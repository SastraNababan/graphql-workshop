const { ApolloServer, gql } = require('apollo-server')
const MoviesData= [
  {
    id: 1,
    "vote_average": 6.9,
    "title": "Aquaman",
  },
  {
    "id": 2,
    "vote_average": 6.6,
    "title": "Bumblebee",
  },
  {
    "id": 3,
    "title": "Dragon Ball Super: Broly",
    "vote_average": 7.3,
  }
]

const typeDefs = gql`
  type Movie {
    id: ID
    title: String
    vote_average: Float,
  }

  type Query {
    movies: [Movie]
    movie(id: ID): Movie
  }
`

const resolvers = {
  Query: {
    movies: () => MoviesData,
    movie: (_, { id }) => {
      return MoviesData.find(movie => movie.id == id)
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(data => console.log(`server started at port ${data.port}`))