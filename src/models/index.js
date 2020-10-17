import Sequelize from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: 'postgres',
  },
);


const models = {
  User:  require('./user').default(sequelize, Sequelize),//sequelize.import('./user'),
  Message: require('./message').default(sequelize, Sequelize),//sequelize.import('./message'),
};


Object.keys(models).forEach(key => {
  if('associate' in models[key]){
    models[key].associate(models);
  }
});

export {sequelize};

export default models;