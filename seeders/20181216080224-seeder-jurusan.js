'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Jurusans', [{
        kode: 'IF0001',
        nama: 'Informatika'
      },{
        kode: 'SI0001',
        nama: 'Sistem Informasi'
      },{
        kode: 'TK0001',
        nama: 'Teknik Komputer'
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Jurusans', null, {});
  }
};
