module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    date: DataTypes.STRING
  })
  Post.associate = function (models) {
    Post.belongsTo(models.Author, { foreignKey: 'authorId', as: 'author' })
  }
  return Post
}
