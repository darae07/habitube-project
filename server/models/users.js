'use strict';

const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      keyword: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (data, options) => {
          var shasum = crypto
            .createHash('sha1')
            .update(data.password)
            .digest('hex');

          data.password = shasum;
        },
      },
    },
  );
  users.associate = function (models) {
    users.hasMany(models.todobox, { foreginKey: 'usersId' });
  };
  return users;
};
