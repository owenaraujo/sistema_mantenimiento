const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');



// add servicio
router.get('/addservicio',isLoggedIn,(req,res) => {
    res.render ('servicio/addservicio');
});
router.post('/addservicio', async (req, res)=>{
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
        res.redirect('/servicio');        
}); 

// vista en reparacion
router.get('/',isLoggedIn, async (req,res) =>{
    let services = [];
    // getting rol user
    // const userRol = await pool.query('SELECT rol FROM usuarios WHERE id = ? LIMIT 1',[req.user.id])
    const {rol,id} = req.user;

    // verify is adminstrator
    if (rol == 'administrador') {
        services = await pool.query('SELECT * FROM servicio where local=1');
        res.render('servicio/reparacionesP',{services});
        return
    }   
    
    services = await pool.query('SELECT * FROM servicio where local=1 AND user_id=?',[id]);
    res.render('servicio/reparacionesP',{services})
});
// reparado
router.get('/reparados',isLoggedIn, async (req,res) =>{
    const services = await pool.query('SELECT * FROM servicio where local=2');
        res.render('servicio/reparados',{services});
});
// delete dispositivo
router.get('/delete/:id', async (req,res) =>{
    const {id} = req.params;
    await pool.query('UPDATE servicio SET local = 0  WHERE  id= ?',[id]);
    req.flash('success','Equipo Borrado')

        res.redirect('/servicio/reparados');
});
// retiro de dispositivo
router.get('/entregarDispositivo/:id',isLoggedIn, async (req,res) =>{
    const {id} = req.params;
    await pool.query('UPDATE servicio SET local = 3  WHERE  id= ?',[id]);
    req.flash('success','Equipo Retirado')

        res.redirect('/retirados');
});
// vista retiro 
router.get('/retirados', isLoggedIn, async (req,res) =>{
    const services = await pool.query('SELECT * FROM servicio where local= 2');
        res.render('servicio/retirados',{services});
});
// vista detalles
router.get('/detallesDispositivos/:id',isLoggedIn, async (req,res) =>{
    const {id} = req.params;
     const dispositivo = await pool.query('SELECT * FROM servicio WHERE  ID= ?',[id]);
    res.render('servicio/detallesDispositivos',{link:dispositivo[0]});
    console.log(req.body)
        
});       

// historial de eliminaciones
router.get('/historialDBispositivos',isLoggedIn, async (req,res) =>{
    const services = await pool.query('SELECT * FROM servicio where local=0');
        res.render('servicio/historialBDispositivos',{services});
});
// editar dispositivo
router.get('/editDispositivo/:id',isLoggedIn, async (req,res) =>{
const {id} = req.params;
 const dispositivo = await pool.query('SELECT * FROM servicio WHERE  ID= ?',[id]);
res.render('servicio/editDispositivo',{link:dispositivo[0]});
    
});
router.post('/editDispositivo/:id',async (req, res)=>{
const {id}= req.params;
const {
reparaciones_hechas} = req.body;
const newservice ={
reparaciones_hechas
};
await pool.query('UPDATE  servicio set ?, local = 2 WHERE  ID= ?',[newservice, id])
req.flash('success','equipo Reparado')

res.redirect('/servicio')
})



module.exports = router;
