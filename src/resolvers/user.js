import jwt from 'jsonwebtoken';

const createToken = async (user,secret, expiresIn) => {
 const {id, email, username} = user;
 return jwt.sign({id, email, username},secret, {expiresIn});
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
     }
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