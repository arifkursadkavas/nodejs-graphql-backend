import { gql } from "apollo-server-express";


export default gql`
    type Query {
       books: [Book!]
       book(id:ID!):Book
       users: [User!]
       user(id:ID!):User
       messages: [Message!]
       message(id:ID!):Message
       me:User
     }
    
    type Mutation{
      createMessage(text: String!): Message!
      deleteMessage(id: ID!): Message!
    }

    type Book { 
      id: ID!,
      title: String, 
      author: String 
    }

    type User{
      id: ID!,
      username: String!
      messages: [Message!]
    }

    type Message{
      id: ID!
      text: String!
      user: User!
    }
`;