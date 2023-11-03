const {db, DataTypes} = require("../db/config");


const Attack = db.define("attack", {
    title: DataTypes.STRING,
    mojoCost: DataTypes.INTEGER,
    staminaCost: DataTypes.INTEGER
});


module.exports = Attack;