import cors from 'cors';
import express from 'express';
import  {ApolloServer} from 'apollo-server-express';

import 'dotenv/config';

import schema from './schema';
import resolvers from './resolvers';
import models, {sequelize} from './models';
import { seedDb } from './seed';
import { getMe } from './services/identityService';

const eraseDbOnSync = false;

sequelize.sync({force:eraseDbOnSync}).then(async () => {
  if(eraseDbOnSync){
    seedDb();
  }
});

const server = new ApolloServer({
  typeDefs:schema,
   resolvers,
   context: async () => ({
     models,
     me: await getMe('arif'),
   })
  }
  );

const app = express();
app.use(cors());
server.applyMiddleware({app, path: '/graphql'});

sequelize.sync().then(async () => {
  app.listen({port:4000}, () => console.log('App is served here: http://localhost:4000'))
})
