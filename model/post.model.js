const { DataTypes } = require("sequelize")

const sequelize = require("../database")

const User = require("./user.model")

const Category = require("./category.model")

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true
}
)

Post.belongsTo(User, { foreignKey: 'userId' });
Post.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Post;