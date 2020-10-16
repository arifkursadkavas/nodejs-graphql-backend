import { v4 as uuidv4 } from 'uuid';

export default {
    Query: { 
      books: (parent,{},{models}) => Object.values(models.books), 
      book:(parent,{id},{models}) => {
        return models.books[id];
      },
      users: (parent,{},{models}) => Object.values(models.users), 
      user:(parent,{id},{models}) => {
        return models.users[id];
      },
      messages: (parent,{},{models}) => Object.values(models.messages), 
      message: async(parent,{id},{models}) => {
        await wait(1000);
        return models.messages[id];
      },
      me: (parent, args, {me}) => {return me}
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

   User:{
     messages: (user, {  }, { models }) => {
       return Object.values(models.messages).filter(t => t.userId === user.id);
     }
   },

   Message:{
     user: (message, {  }, { models }) => {
       return  models.users[message.userId];
     }
   }
  };