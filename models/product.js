'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
      Product.hasMany(models.Order)
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Name cannot be empty`
        },
        notNull: {
          msg: `Name is required`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Description cannot be empty`
        },
        notNull: {
          msg: `Description is required`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Price cannot be empty`
        },
        notNull: {
          msg: `Price is required`
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Image cannot be empty`
        },
        notNull: {
          msg: `Image is required`
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      // validate: {
      //   notEmpty: {
      //     msg: `Category cannot be empty`
      //   },
      //   notNull: {
      //     msg: `Category is required`
      //   }
      // }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};