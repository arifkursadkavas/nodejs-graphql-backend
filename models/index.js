// Some fake data
const books = {
    1 : {
      id:'1',
      title: "Harry Potter and the Sorcerer's stone",
      author: 'J.K. Rowling',
    },
    2 : {
      id:'2',
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
};


const users = {
  1: {
    id: '1',
    username: 'arif',
    messageIds: [1]
  },
  2: {
    id: '2',
    username: 'kürsad',
    messageIds: [2]
  },
};

const messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1'
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2'
  },
};

export default {
    users,
    messages,
    books
}