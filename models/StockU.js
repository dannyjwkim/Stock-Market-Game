module.exports = function(sequelize, DataTypes){
    var StockU = sequelize.define(
         'StockU', {
           id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        len: [1,10]
      }
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]
      }

    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 140]
      }

    },
      
    stockNames: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 140]

      },
     
    }

    } ,


        {
            classMethods:{
                associate: function(models) {
                StockU.hasMany(models.stockGp);
                }

            }
        }
     




       
        
);
    return StockU;
};