module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birthday: DataTypes.DATE
  })
  return Author
}
