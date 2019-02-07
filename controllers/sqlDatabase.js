// my sql work bench , create new database p5db , password is mysql
// first thing npm install mysql 2
// url is http://collabedit.com/85f5u , go there copy paste

var Sequelize = require('sequelize');
var sequelizeTransforms = require('sequelize-transforms');

const sequelizeInstance = new Sequelize('p5db', 'root', 'mysql', {
    host: '127.0.0.1',
    port: '3306', // not 3336 , from mysql workbench
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
});

sequelizeInstance.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

sequelizeTransforms(sequelizeInstance);


module.exports.sequelizeInstance = sequelizeInstance;
module.exports.Sequelize = Sequelize;

