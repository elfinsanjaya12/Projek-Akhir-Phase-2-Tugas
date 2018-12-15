'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
      const password = bcrypt.hashSync('rahasia', 10); 
      return queryInterface.bulkInsert('Users', [{
        username: 'admin',
        email: 'admin@gmail.com',
        level: 'admin',
        password : password,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
