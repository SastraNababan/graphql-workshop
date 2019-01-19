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


// TODO : Write Scheme 
const typeDefs = gql`
 type movies {
   # write fields here
 }

 type Query {
   # query for all movies and single movie by id 
 }
`

// TODO : Write Resolver
const resolvers = {
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(data => console.log(`server started at port ${data.port}`))