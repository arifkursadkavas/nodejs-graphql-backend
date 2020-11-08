import  models from "../models";


export const getMe = async (login) => {
    let user = await models.User.findOne({
        where: { username: login },
      });
   
      if (!user) {
        user = await models.User.findOne({
          where: { email: login },
        });
      }
   
      return user;
}