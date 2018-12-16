var express = require('express');
var router = express.Router();
const models = require('../models');
const { checkAuth } = require('../middlewares/auth');

// menampilkan semua data jurusan
router.get('/', checkAuth, function(req, res, next) {
    const user = req.session.user
    let page = req.query.page || 1;
    let offset = 0;
    if (page > 1) {
        offset = ((page - 1) * 5)  + 1;
    }
    models.Jurusan.findAndCountAll({
        limit : 5,
        offset: offset,
        order : [['id','DESC']]
    }).then(jurusans => {
        const alertMessage = req.flash('alertMessage');
        const alertStatus = req.flash('alertStatus');
        const alert = { message: alertMessage, status: alertStatus};
        const totalPage = Math.ceil(jurusans.count / 5);
        const pagination = {totalPage : totalPage, currentPage: page};  
        res.render('jurusan/index', {
            user:user,
            jurusans:jurusans.rows,
            alert: alert,
            pagination: pagination,
        })
    }).catch(err => {
        console.log(err)
        res.render('jurusan/index')
    })
});

router.get('/create', checkAuth, (req, res) => {
    const user = req.session.user
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus};
    res.render('jurusan/create', {
        user:user,
        alert: alert,
    });
});

router.post('/create', checkAuth, (req, res) => {
    const user = req.session.user
    models.Jurusan.build(req.body).save().then(() => {
        req.flash('alertMessage','Success Add New Jurusan');
        req.flash('alertStatus', 'success');
        res.redirect('/jurusan', {
            user:user
        });
    }).catch((err) => {
        req.flash('alertMessage', err.message);
        req.flash('alertStatus', 'danger');
        res.redirect('/jurusan');
    });
});
module.exports = router;
