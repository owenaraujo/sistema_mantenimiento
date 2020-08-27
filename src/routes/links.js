const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

// add servicio
router.get('/servicio',isLoggedIn,(req,res) => {
    res.render ('servicio');
});
router.post('/servicio', async (req, res)=>{
    const {
        tipo,
        nombre_cliente,
        cedula,
        modelo,
        marca,
        falla,
    
    } = req.body;
    const newservice ={
        tipo,
        nombre_cliente,
        cedula,
        modelo,
        marca,
        falla,    
        user_id: req.user.id
    };
    await pool.query('INSERT INTO servicio set ?',[newservice]);
        req.flash('success','Registrado')
        res.redirect('/links/reparacionesP');        
}); 

// vista en reparacion
router.get('/reparacionesP',isLoggedIn, async (req,res) =>{
    let services = [];
    // getting rol user
    const userRol = await pool.query('SELECT rol FROM usuarios WHERE id = ? LIMIT 1',[req.user.id])
    const {rol} = userRol[0];

    // verify is adminstrator
    if (rol == 'administrador') {
        services = await pool.query('SELECT * FROM servicio where local=1');
        res.render('reparacionesP',{services});
        return
    }   
    
    services = await pool.query('SELECT * FROM servicio where local=1 AND user_id=?',[req.user.id]);
    res.render('reparacionesP',{services})
});
// reparado
router.get('/reparados',isLoggedIn, async (req,res) =>{
    const service = await pool.query('SELECT * FROM servicio where local=2');
        res.render('reparados',{service});
});
// delete dispositivo
router.get('/servicio/delete/:id', async (req,res) =>{
    const {id} = req.params;
    await pool.query('UPDATE servicio SET local = 0  WHERE  id= ?',[id]);
    req.flash('success','Equipo Borrado')

        res.redirect('/links/reparacionesP');
});
// retiro de dispositivo
router.get('/servicio/entregarDispositivo/:id',isLoggedIn, async (req,res) =>{
    const {id} = req.params;
    await pool.query('UPDATE servicio SET local = 3  WHERE  id= ?',[id]);
    req.flash('success','Equipo Retirado')

        res.redirect('/links/retirados');
});
// vista retiro 
router.get('/retirados', isLoggedIn, async (req,res) =>{
    const service = await pool.query('SELECT * FROM servicio where local=3');
        res.render('retirados',{service});
});
// vista detalles
router.get('/servicio/detallesDispositivos/:id',isLoggedIn, async (req,res) =>{
    const {id} = req.params;
     const dispositivo = await pool.query('SELECT * FROM servicio WHERE  ID= ?',[id]);
    res.render('detallesDispositivos',{link:dispositivo[0]});
        
});       

// historial de eliminaciones
router.get('/historialDBispositivos',isLoggedIn, async (req,res) =>{
    const service = await pool.query('SELECT * FROM servicio where local=0');
        res.render('historialBDispositivos',{service});
});
// editar dispositivo
router.get('/servicio/editDispositivo/:id',isLoggedIn, async (req,res) =>{
const {id} = req.params;
 const dispositivo = await pool.query('SELECT * FROM servicio WHERE  ID= ?',[id]);
res.render('editDispositivo',{link:dispositivo[0]});
    
});
router.post('/servicio/editDispositivo/:id',async (req, res)=>{
const {id}= req.params;
const {
reparaciones_hechas} = req.body;
const newservice ={
reparaciones_hechas
};
await pool.query('UPDATE  servicio set ?, local = 2 WHERE  ID= ?',[newservice, id])
req.flash('success','equipo Reparado')

res.redirect('/links/reparacionesP')
})










// add maquina
router.get('/add',isLoggedIn,(req,res) => {
res.render ('links/add');
});
router.post('/add', async (req, res)=>{
const {
equipo,tipo, codificacion, marca, modelo, serial, funcionamiento, observaciones} = req.body;
const newlink ={
equipo,
codificacion,
tipo,  
marca, 
modelo, 
serial,
funcionamiento, 
observaciones,
user_id: req.user.id
};
await pool.query('INSERT INTO lista_maquinas set ?',[newlink]);
req.flash('success','Equipo Registrado')
res.redirect('/links');        
}); 
router.get('/', isLoggedIn, async (req,res) =>{
const links = await pool.query('SELECT * FROM lista_maquinas WHERE user_id = ?',[req.user.id]);
res.render('links/lista_maquinas',{links});
});

// delete maquina
router.get('/delete/:id', async (req,res) =>{
const {id} = req.params;
await pool.query('DELETE FROM lista_maquinas WHERE  ID= ?',[id]);
req.flash('success','Equipo Borrado')

res.redirect('/links');
});
// edit maquina 
router.get('/edit/:id',isLoggedIn, async (req,res) =>{
const {id} = req.params;
const links = await pool.query('SELECT * FROM lista_maquinas WHERE  ID= ?',[id]);
res.render('links/edit',{link:links[0]});

});
router.post('/edit/:id',isLoggedIn, async (req, res)=>{
const {id}= req.params;
const {
equipo,tipo, codificacion, marca, modelo, serial, funcionamiento, observaciones} = req.body;
const newlink ={
equipo,
codificacion,
tipo,  
marca, 
modelo, 
serial,
funcionamiento, 
observaciones,
user_id: req.user.id
};
await pool.query('UPDATE  lista_maquinas set ? WHERE  ID= ?',[newlink, id])
req.flash('success','Equipo Editado')

res.redirect('/links')
})









// add product
router.get('/productos/addproduct',isLoggedIn,(req,res) => {
res.render ('links/productos/addproduct');
});
router.post('/productos/addproduct', async (req, res)=>{
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
res.redirect("/links/productos/lista_productos")
}); 
router.get('/productos/lista_productos',isLoggedIn, async (req,res) =>{
const productos = await pool.query('SELECT * FROM lista_productos WHERE user_id = ?',[req.user.id]);
res.render('links/productos/lista_productos',{productos});
});
// delete producto 
router.get('/productos/delete/:id', async (req,res) =>{
const {id} = req.params;
await pool.query('DELETE FROM lista_productos WHERE  id= ?',[id]);
req.flash('success','Producto Borrado')

res.redirect('/links/productos/lista_productos');
});
// editproduct
router.get('/productos/editproduct/:id',isLoggedIn, async (req,res) => {
const {id} = req.params;
const productos = await pool.query('SELECT * FROM lista_productos WHERE  ID= ?',[id]);
res.render ('links/productos/editproduct', {product:productos[0]});
});
router.post('/productos/editproduct/:id', async (req, res)=>{
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

res.redirect("/links/productos/lista_productos")
}); 
// serviciop tecmico

module.exports = router;