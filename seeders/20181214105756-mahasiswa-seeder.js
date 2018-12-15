'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Mahasiswas', [{
      no_peserta: 'P-001',
      nama_siswa: 'Elfin Sanjaya',
      alamat    : 'Lampung',
      telpon    : '089898989',
      jenis_kelamin : 'L',
      createdAt   : new Date(),
      updatedAt   : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Mahasiswas', null, {});
  }
};
