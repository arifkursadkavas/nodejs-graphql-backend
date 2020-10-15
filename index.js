import cors from 'cors';
import express from 'express';
import  {ApolloServer} from 'apollo-server-express';
import 'dotenv/config';


// Some fake data
const books = {
    1 : {
      id:'1',
      title: "Harry Potter and the Sorcerer's stone",
      author: 'J.K. Rowling',
    },
    2 : {
      id:'2',
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
};
  
  // The GraphQL schema in string form
  const schema = `
    type Query {
       books: [Book!]
       book(id:ID!):Book
     }
    type Book { 
      id: ID!,
      title: String, 
      author: String 
    }
  `;
  
  // The resolvers
  const resolvers = {
    Query: { 
      books: () => books, 
      book:(parent,{id}) => {
      return books[id];
    } },
  };

const server = new ApolloServer({typeDefs:schema, resolvers});

const app = express();
app.use(cors());
server.applyMiddleware({app, path: '/graphql'});


app.listen({port:4000}, () => console.log('App is served here: http://localhost:4000'))