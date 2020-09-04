const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', (req, res)=>{
    res.render("stock/stock")
});
// vista herramientas
router.get('/herramientas', (req, res)=>{
    res.render("stock/herramientas/herramientas")
});
// add herramienta

router.post('/addherramienta', async (req, res)=>{
    const {
        tipo,
        nombre,
        detalles,
        cantidad
        } = req.body;
    const newherramienta ={
        tipo,
        nombre,
        detalles,
        cantidad,
        user_id: req.user.id

                        };
    await pool.query('INSERT INTO herramientas set ?',[newherramienta]);
        req.flash('success','registrado')
        res.redirect('/stock/herramientas');        
}); 

// stock
router.get('/stock', (req, res)=>{
    res.render('stock/stock')
});
// vistas stock
// repuestos
router.get('/repuestos', (req, res)=>{
    res.render('repuestos')
});
// almacen
router.get('/almacen', (req, res)=>{
    res.render('almacen')
});
// limpieza
router.get('/limpieza', (req, res)=>{
    res.render('limpieza')
});
// taller
router.get('/taller', (req, res)=>{
    res.render('taller')
});
// oficina
router.get('/oficina', (req, res)=>{
    res.render('oficina')
});


module.exports = router;
