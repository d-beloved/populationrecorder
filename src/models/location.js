
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    malePopulation: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    femalePopulation: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    locality: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  return Location;
};
