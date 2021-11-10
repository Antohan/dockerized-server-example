const express = require('express');
const Sequelize = require('sequelize');

const {
  POSTGRES_DB,
  POSTGRES_USER = 'postgres',
  POSTGRES_PASSWORD = 'postgres',
} = process.env;

const sequelize = new Sequelize(
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  {
    dialect: 'postgres',
    host: 'postgres',
    port: 5432
  });

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  })

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

const server = express();

sequelize.sync().then(()=>{
  server.listen(process.env.PORT || 4000, function(){
    console.log("Сервер ожидает подключения...");
  });
}).catch(err=>console.log(err));


server.get('/', (req, res) => {
  User.findAll({ raw: true }).then(data => {
    res.send(JSON.stringify(data));
  }).catch(err=>console.log(err));
});
