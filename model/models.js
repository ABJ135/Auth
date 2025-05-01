const sequelize = require('../database');
const User = require('./user.model');
const Post = require('./post.model');
const Category = require('./category.model');

User.hasMany(Post, { foreignKey: 'userId' });
Category.hasMany(Post, { foreignKey: 'categoryId' });
Post.belongsTo(User, { foreignKey: 'userId' });
Post.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = {
  sequelize,
  User,
  Post,
  Category,
};
