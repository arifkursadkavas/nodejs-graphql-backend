import { ForbiddenError } from "apollo-server";
import { skip } from "graphql-resolvers";

export const isAuthenticated = (parent,args,{me}) => me ? skip : new ForbiddenError('Not Authenticated');

export const isMessageOwner = async (parent, {id}, {models, me}) => {
    const message = await models.Message.findByPk(id, {raw:true});

    if(message.userId !== me.id){
        throw ForbiddenError('You are not the owner of this entity');
    }

    return skip;
}
