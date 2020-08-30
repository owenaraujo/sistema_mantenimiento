const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

// / add product
router.get('/addproduct',isLoggedIn,(req,res) => {
res.render ('productos/addproduct');
});
router.post('/addproduct', async (req, res)=>{
const {
producto,cantidad, precio_por_lote,precio_unitario,codificacion,peso, medida } = req.body;
const newproduct ={
producto,
cantidad,
precio_por_lote,  
precio_unitario, 
codificacion,
peso,
medida,
user_id: req.user.id
};
await pool.query('INSERT INTO lista_productos set ?',[newproduct]);
req.flash('success',' Registrado')
res.redirect("/productos")
}); 
router.get('/',isLoggedIn, async (req,res) =>{
const productos = await pool.query('SELECT * FROM lista_productos WHERE user_id = ?',[req.user.id]);
res.render('productos/lista_productos',{productos});
});
// delete producto 
router.get('/delete/:id', async (req,res) =>{
const {id} = req.params;
await pool.query('DELETE FROM lista_productos WHERE  id= ?',[id]);
req.flash('success','Producto Borrado')

res.redirect('/productos');
});
// editproduct
router.get('/editproduct/:id',isLoggedIn, async (req,res) => {
const {id} = req.params;
const productos = await pool.query('SELECT * FROM lista_productos WHERE  ID= ?',[id]);
res.render ('productos/editproduct', {product:productos[0]});
});
router.post('/editproduct/:id', async (req, res)=>{
const {id}= req.params;
const {
producto,cantidad, precio_por_lote,precio_unitario,codificacion,peso } = req.body;
const newproduct ={
producto,
cantidad,
precio_por_lote,  
precio_unitario, 
codificacion,
peso
};
await pool.query('UPDATE  lista_productos set ? WHERE  ID= ?',[newproduct, id]);
req.flash('success','Producto Editado')

res.redirect("/productos")
}); 

//api

router.get('/api/', async (req,res) =>{
    const productos = await pool.query('SELECT * FROM lista_productos');
    res.json(productos)
    });




module.exports = router;
