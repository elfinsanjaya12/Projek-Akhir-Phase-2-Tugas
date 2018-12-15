'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mahasiswa = sequelize.define('Mahasiswa', {
    no_peserta: DataTypes.STRING,
    nama_siswa: DataTypes.STRING,
    alamat: DataTypes.STRING,
    telpon: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING
  }, {});
  Mahasiswa.associate = function(models) {
    // associations can be defined here
  };
  return Mahasiswa;
};