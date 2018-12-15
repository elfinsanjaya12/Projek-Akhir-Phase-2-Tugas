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

// delete data mahasiswa
router.get('/delete/:id', (req,res) => {
    const mahasiswaId = req.params.id
    models.Mahasiswa.findOne({where: {id: mahasiswaId}}).then(mahasiswa =>{
        return mahasiswa.destroy()
    }).then(() => {
        req.flash('alertMessage', `Success Delete Item With Id : ${id}`);
        req.flash('alertStatus', 'success');
        res.redirect('/mahasiswa');
    }).catch(err =>{
        console.log(err)
        res.redirect('/mahasiswa')
    })
})

module.exports = router;
