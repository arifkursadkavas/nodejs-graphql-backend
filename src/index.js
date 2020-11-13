import cors from 'cors';
import express from 'express';
import  {ApolloServer,AuthenticationError} from 'apollo-server-express';

import 'dotenv/config';
import jwt from 'jsonwebtoken';

import schema from './schema';
import resolvers from './resolvers';
import models, {sequelize} from './models';
import { seedDb } from './seed';

const eraseDbOnSync = false;

sequelize.sync({force:eraseDbOnSync}).then(async () => {
  if(eraseDbOnSync){
    seedDb();
  }
});

const getMe = async req => {
  const token = req.headers['x-token'];

  if(token){
    try{
      return await jwt.verify(token, process.env.SECRET);
    }catch(e){
      throw new AuthenticationError('Your session expired, Login again plesae');
    }
  }
}

const server = new ApolloServer({
  typeDefs:schema,
   resolvers,
   //formatError: error => {
   //  // remove the internal sequelize error message
   //  // leave only the important validation error
   //  const message = error.message
   //    .replace('SequelizeValidationError: ', '')
   //    .replace('Validation error: ', '');
   //
   //  return {
   //    ...error,
   //    message,
   //  };
   //},
   context: async ({req}) => {
     const me = await getMe(req);
     
     return {
     models,
     me: me,
     secret: process.env.SECRET
     }
   }
  
});

const app = express();
app.use(cors());
server.applyMiddleware({app, path: '/graphql'});

sequelize.sync().then(async () => {
  app.listen({port:4000}, () => console.log('App is served here: http://localhost:4000'))
})
