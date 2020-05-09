'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'John',
      email: 'example@example.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'Doe',
      email: 'example@test.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
