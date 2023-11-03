const {db, DataTypes} = require("../db/config");


const Card = db.define("card", {
    name: DataTypes.STRING,
    mojo: DataTypes.INTEGER,
    stamina: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING
});


module.exports = Card;