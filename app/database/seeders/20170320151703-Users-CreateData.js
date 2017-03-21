'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: function (queryInterface, Sequelize) {
    const now = new Date();
    const usersRaw = [
      {
        id: 1,
        username: 'Admin',
        firstname: 'John',
        lastname: 'Doe',
        password: 'verysecret',
        email: 'admin@mail.com',
        level: 'admin'
      },
      {
        id: 2,
        username: 'DeveloperOne',
        firstname: 'Jane',
        lastname: 'Doe',
        password: 'secret',
        email: 'dev@company.com',
        level: 'dev'
      },
      {
        id: 3,
        username: 'DeveloperTwo',
        firstname: 'Alan',
        lastname: 'Turing',
        password: 'wow',
        email: 'rly@tho.com',
        level: 'dev'
      },
      {
        id: 4,
        username: 'UserOne',
        firstname: 'Alonzo',
        lastname: 'Church',
        password: 'wowagain',
        email: 'user@mail.com',
        level: 'user'
      },
      {
        id: 5,
        username: 'UserTwo',
        firstname: 'Haskell',
        lastname: 'Curry',
        password: 'iamout',
        email: 'other@mail.com',
        level: 'user'
      }
    ];
    const users = usersRaw.map(user => {
      user.password = bcrypt.hashSync(user.password);
      user.createdAt = now;
      user.updatedAt = now;
      return user;
    });
    return queryInterface.bulkInsert('Users', users);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};