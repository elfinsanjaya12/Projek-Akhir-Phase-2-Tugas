var express = require('express');
var router = express.Router();
const models = require('../models')
const { checkAuth } = require('../middlewares/auth')

// menampilkan semua data mahasiswa
router.get('/', checkAuth, function(req, res, next) {
    const user = req.session.user
    models.Mahasiswa.findAll().then(mahasiswas => {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus};
        res.render('mahasiswa/index', {
            user:user,
            mahasiswas:mahasiswas,
            alert: alert,

        })
    }).catch(err => {
        console.log(err)
        res.render('mahasiswa/index')
    })
});

//pindah ke halamana create
router.get('/create', checkAuth, (req, res) =>{
    const user = req.session.user
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus};
    res.render('mahasiswa/create',{
        user:user,
        alert: alert,
    })
})

// membuat create
router.post('/create', checkAuth, (req,res) => {
    const user = req.session.user
    const { no_peserta, nama_siswa, alamat, telpon, jenis_kelamin } = req.body
    models.Mahasiswa.create({no_peserta, nama_siswa, alamat, telpon, jenis_kelamin}).then(mahasiswa => {
        req.flash('alertMessage','Success Add New Item');
        req.flash('alertStatus', 'success');
        res.redirect('/mahasiswa', {
            alert: alert,
            user:user
        })
    }).catch(err => {
        console.log(err)
        res.redirect('/mahasiswa')
    })
})

// pindah halaman edit
router.get('/edit/:id', checkAuth,(req, res) => {
    const user = req.session.user
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus};
    const mahasiswaId = req.params.id
    models.Mahasiswa.findOne({where: {id: mahasiswaId}}).then(mahasiswa => {
        res.render('mahasiswa/edit', {
            mahasiswa:mahasiswa,
            alert: alert,
            user:user
        })
    }).catch(err => {
      console.log(err)
      res.redirect('/mahasiswa')
    })
})
router.post('/edit/:id',checkAuth, (req, res) => {
    const user = req.session.user
    const mahasiswaId = req.params.id
    const { no_peserta, nama_siswa, alamat, telpon, jenis_kelamin} =  req.body
    models.Mahasiswa.findOne({where: {id: mahasiswaId}}).then(mahasiswa => {
        return mahasiswa.update({
            no_peserta,
            nama_siswa,
            alamat,
            telpon,
            jenis_kelamin,
        }).then(updateMahasiswa => {
            req.flash('alertMessage', `Success Update Item With Id : ${mahasiswaId}`);
            req.flash('alertStatus', 'success');
            res.redirect('/mahasiswa', {user:user});
        })
    }).catch(err => {
      console.log(err)
      res.redirect('/mahasiswa')
    })
})

// delete data mahasiswa
router.get('/delete/:id', (req,res) => {
    const user = req.session.user
    let mahasiswaId = req.params.id;
    models.Mahasiswa.findOne({where: {id: mahasiswaId}}).then(mahasiswa =>{
        return mahasiswa.destroy()
    }).then(() => {
        req.flash('alertMessage', `Success Delete Mahasiswa With Id : ${mahasiswaId}`);
        req.flash('alertStatus', 'success');
        res.redirect('/mahasiswa',{user:user});
    }).catch(err =>{
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/mahasiswa')
    })
});

module.exports = router;
