'use strict';
module.exports = (sequelize, DataTypes) => {
  const Jurusan = sequelize.define('Jurusan', {
    kode: {
      type: DataTypes.STRING,
      unique: {
        msg: "Kode harus Unik"
      },
      validate: {
        is: {
          args: /(IF|SI|TK)\d{4}/,
          msg: "Code Item harus diawali dengan IF | SI | TK dan diikuti’ dengan 4 digit angka"
        }
      }
    },
    nama: DataTypes.STRING
  }, {});
  Jurusan.associate = function(models) {
    // associations can be defined here
  };
  return Jurusan;
};