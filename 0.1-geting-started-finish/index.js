const { ApolloServer, gql } = require('apollo-server');
const BooksData = [
  {
    id:1,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    id:2,
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    hello(name:String): String
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    hello: (root, args, context) => {
      return "Hello " + args.name + " Welcome to GraphQL"
    },
    books: () => BooksData,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});