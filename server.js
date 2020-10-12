const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');

// Some fake data
const books = [
    {
      title: "Harry Potter and the Sorcerer's stone",
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];
  
  // The GraphQL schema in string form
  const typeDefs = `
    type Query { books: [Book] }
    type Book { title: String, author: String }
  `;
  
  // The resolvers
  const resolvers = {
    Query: { books: () => books },
  };

const server = new ApolloServer({typeDefs, resolvers});

const app = express();
server.applyMiddleware({app});


app.listen({port:4000}, () => console.log('App is served here: http://localhost:4000'))