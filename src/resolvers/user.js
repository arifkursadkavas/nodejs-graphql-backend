import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { isAdmin } from './authorization';

const createToken = async (user,secret, expiresIn) => {
 const {id, email, username, role} = user;
 return jwt.sign({id, email, username,role},secret, {expiresIn});
};

export default {
    Query: { 
      users: async (parent,args,{models}) => {
        return await models.User.findAll();
      },

      user: async (parent,{id},{models}) => {
        return await models.User.findByPk(id);
      },

      me: (parent, args, {models, me}) => {
        return models.User.findByPk(me.id);
      }
   },

   Mutation: {
     signUp: async( parent, {username, email, password}, {models,secret}) => {
        const user = await models.User.create({
          username, email, password
        });
        
        return {token: createToken(user,secret, '60m')};
     },

     signIn: async(parent, {login, password},{models,secret}) => {
        const user = await models.User.findByLogin(login);
        
        if(!user){
          throw new UserInputError('No user was found with this credentials');
        }

        const isValidUser = await user.validatePassword(password);

        if(!isValidUser){
          throw new AuthenticationError('This pair of credentials did not work')
        }

        return  {token: createToken(user,secret, 600)};
     },

     deleteUser: combineResolvers(
       isAdmin, 
       async (parent, {id}, {models}) =>{
        return await models.User.destroy({
          where: {id}
        });
     }),

   },



   User:{
     messages: async (user, args, { models }) => {
        return await models.Message.findAll({
          where:{
            userId: user.id,
          }
        })
     }
   },

  };