'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User)
      Order.belongsTo(models.Product)
    }
    formatstatus(){
      if(this.status) return "On Shipment"
      if(!this.status) return "Waiting Payment"

    }

  }
  Order.init({
    orderNumber: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    shippingAddress: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order',
    hooks: {
      beforeCreate : (order, options) => {
        order.orderNumber = Math.floor(Math.random() * 10000) + new Date(order.createdAt).toISOString().slice(0,4).replaceAll("-", "2");
        order.amount = 1
        order.status = false
      }
    }
  });
  return Order;
};