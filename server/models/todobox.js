'use strict';

const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const todoboxes = sequelize.define(
    'todobox',
    {
      memoTitle: DataTypes.STRING,
      memoContent: DataTypes.STRING,
      youtubeInfo: DataTypes.JSON,
      // isComplete: DataTypes.BOOLEAN,
      isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        // set: function(value) {
        //   if (value === 'true') value = true;
        //   if (value === 'false') value = false;
        //   this.setDataValue('hidden', value);
        // }
      },
      date: DataTypes.STRING,
      usersId: DataTypes.INTEGER,
    },
    {
      hooks: {},
    },
  );

  todoboxes.associate = function (models) {
    todoboxes.belongsTo(models.users, { foreignKey: 'usersId' });
  };
  return todoboxes;
};
