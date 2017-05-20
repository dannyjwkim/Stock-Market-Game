module.exports = function(sequelize, DataTypes) {
  var Quote = sequelize.define("MoneyAccount", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        len: [1, 14]
      }
    },
    money: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    }
   });  
  return Quote;
};
