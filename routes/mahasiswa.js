var express = require('express');
var router = express.Router();
const models = require('../models')

// menampilkan semua data mahasiswa
router.get('/', function(req, res, next) {
    models.Mahasiswa.findAll().then(mahasiswas => {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus};
        res.render('mahasiswa/index', {
            mahasiswas:mahasiswas,
            alert: alert
        })
    }).catch(err => {
        console.log(err)
        res.render('mahasiswa/index')
    })
});

//pindah ke halamana create
router.get('/create', (req, res) =>{
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus};
    res.render('mahasiswa/create',{
        alert: alert
    })
})

// membuat create
router.post('/create', (req,res) => {
    const { no_peserta, nama_siswa, alamat, telpon, jenis_kelamin } = req.body
    models.Mahasiswa.create({no_peserta, nama_siswa, alamat, telpon, jenis_kelamin}).then(mahasiswa => {
        req.flash('alertMessage','Success Add New Item');
        req.flash('alertStatus', 'success');
        res.redirect('/mahasiswa', {
            alert: alert
        })
    }).catch(err => {
        console.log(err)
        res.redirect('/mahasiswa')
    })
})

// pindah halaman edit
router.get('/edit/:id', (req, res) => {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus};
    const mahasiswaId = req.params.id
    models.Mahasiswa.findOne({where: {id: mahasiswaId}}).then(mahasiswa => {
        res.render('mahasiswa/edit', {
            mahasiswa:mahasiswa,
            alert: alert
        })
    }).catch(err => {
      console.log(err)
      res.redirect('/mahasiswa')
    })
})
router.post('/edit/:id', (req, res) => {
    const mahasiswaId = req.params.id
    const { no_peserta, nama_siswa, alamat, telpon, jenis_kelamin} =  req.body
    models.Mahasiswa.findOne({where: {id: mahasiswaId}}).then(mahasiswa => {
        return mahasiswa.update({
            no_peserta,
            nama_siswa,
            alamat,
            telpon,
            jenis_kelamin
        }).then(updateMahasiswa => {
            req.flash('alertMessage', `Success Update Item With Id : ${mahasiswaId}`);
            req.flash('alertStatus', 'success');
            res.redirect('/mahasiswa')
        })
    }).catch(err => {
      console.log(err)
      res.redirect('/mahasiswa')
    })
})

// delete data mahasiswa
router.get('/delete/:id', (req,res) => {
    let mahasiswaId = req.params.id;
    models.Mahasiswa.findOne({where: {id: mahasiswaId}}).then(mahasiswa =>{
        return mahasiswa.destroy()
    }).then(() => {
        req.flash('alertMessage', `Success Delete Mahasiswa With Id : ${mahasiswaId}`);
        req.flash('alertStatus', 'success');
        res.redirect('/mahasiswa');
    }).catch(err =>{
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/mahasiswa')
    })
});

module.exports = router;
