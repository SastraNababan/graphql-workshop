const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql`
  type Query {
    hello(name:String): String
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return "Hello Folks Welcome to GraphQL"
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});