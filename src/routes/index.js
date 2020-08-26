const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('index');
});

// vista herramientas
router.get('/herramientas', (req, res)=>{
    res.render("herramientas")
});
// add herramienta
router.get('/addherramienta',(req,res) => {
    res.render ('addherramienta');
});
router.post('/addherramienta', async (req, res)=>{
    const {
        tipo,
        nombre,
        codificacion,
        cantidad,
        } = req.body;
    const newherramienta ={
        tipo,
        nombre,
        codificacion,
        cantidad

                        };
    await pool.query('INSERT INTO herramientas set ?',[newherramienta]);
        req.flash('success','registrado')
        res.redirect('/herramientas');        
}); 

// stock
router.get('/stock', (req, res)=>{
    res.render('stock')
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