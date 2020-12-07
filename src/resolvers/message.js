import { combineResolvers } from "graphql-resolvers";
import { Sequelize } from "sequelize";
import { isAuthenticated, isMessageOwner } from "./authorization";

import pubsub, {EVENTS} from '../subscription';

export default {
    Query: { 
      messages: async (parent,{cursor, limit=100},{models}) => {
        const cursorOptions = cursor ? 
        {
          where:{
            createdAt:{[Sequelize.Op.lt]: cursor}
          }
        } : null;

        const messages = await models.Message.findAll({
          order:[['createdAt', 'DESC']],
          limit: limit+1,
          ...cursorOptions
        });

        const hasNextPage = messages.length > limit;
        const edges = hasNextPage ? messages.slice  (0, -1) : messages;

        return {
          edges,
          pageInfo:{
            hasNextPage,
            endCursor: messages[messages.length -1].createdAt,
          }
        }
      }, 
      
      message: async (parent,{id},{models}) => {
        return await  models.Message.findByPk(id);
      }
   },

   Mutation:{
     createMessage: combineResolvers(isAuthenticated, async (parent, {text}, {me,models}) => {
       try {
        const message = await models.Message.create({
          text,
          userId: me.id
        });

        pubsub.publish(EVENTS.MESSAGE.CREATED, { messageCreated: {message} });

        return message;

       } catch (error) {
         throw new Error(error);
       }
     }),
     
     deleteMessage: combineResolvers(isAuthenticated, isMessageOwner, async (parent, { id }, { models }) => {
       try {
         return await models.Message.destroy({
               where: {
                 id
        }})
       } catch (error) {
         throw new Error(error);
       }  
     }),
   },

   Message:{
     user: async (message, args, { models }) => {
       return  await models.User.findByPk(message.userId);
     }
   },

   Subscription:{
      messageCreated: {
        subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED)
      }
   }

  };