module.exports = function(sequelize, DataTypes){
    var stockGp = sequelize.define(
        'stockGp', {
     stockName: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        len: [1, 14]
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue : 0,
      validate: {
        len: [1, 10]
      }
    }

        }

       /*
        ,

        {
            classMethods:{
                associate:function(models){
                    stockGp.belongsTo(models.StockU,  {  as: 'stockNamea' , through : 'stockName'} );
                }
            }
        }
      */
    );
    return stockGp;
};