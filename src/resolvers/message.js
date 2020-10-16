import { v4 as uuidv4 } from 'uuid';

export default {
    Query: { 
      messages: (parent,{},{models}) => Object.values(models.messages), 
      message: async(parent,{id},{models}) => {
        await wait(1000);
        return models.messages[id];
      }
   },

   Mutation:{
     createMessage:(parent, {text}, {me,models}) => {
       const id = uuidv4();
       const message = {
         id,
         text,
         userId: me.id
       };
       models.messages[id] = message;
       models.users[me.id].messageIds.push(id);
       //console.log(users);
       return message;
     },
       deleteMessage: (parent, { id }, { models }) => {
       const {[id]: message, otherMessages} = models.messages;
       
       if(!message){
         return false;
       }

       models.messages= otherMessages;
       return true;
     }
   },

   Message:{
     user: (message, {  }, { models }) => {
       return  models.users[message.userId];
     }
   }
  };