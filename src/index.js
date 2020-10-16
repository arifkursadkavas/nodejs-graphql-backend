import cors from 'cors';
import express from 'express';
import  {ApolloServer} from 'apollo-server-express';

import 'dotenv/config';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';



function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}
  

const server = new ApolloServer({
  typeDefs:schema,
   resolvers,
   context:{
     models,
     me: models.users[1],
   }
  }
  );

const app = express();
app.use(cors());
server.applyMiddleware({app, path: '/graphql'});


app.listen({port:4000}, () => console.log('App is served here: http://localhost:4000'))