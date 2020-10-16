export default {
    Query: { 
      users: (parent,{},{models}) => Object.values(models.users), 
      user:(parent,{id},{models}) => {
        return models.users[id];
      },
      me: (parent, args, {me}) => {return me}
   },



   User:{
     messages: (user, {  }, { models }) => {
       return Object.values(models.messages).filter(t => t.userId === user.id);
     }
   },

  };