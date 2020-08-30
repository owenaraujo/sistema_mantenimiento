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
// detalles reparaciones
router.get('/detallesReparaciones/:id',isLoggedIn, async (req,res) =>{
    const {id} = req.params;
     const dispositivo =
      await pool.query('SELECT * FROM reparaciones_servicio WHERE  reparacio_servicio_id= ?',[id]);
      const nombre_cliente = await pool.query('SELECT * FROM servicio WHERE id= ?',[id]);
    res.render('servicio/detallesReparaciones',{dispositivo, nombre_cliente});
    console.log(req.body)
        
});        

// historial de eliminaciones
router.get('/historialDBispositivos',isLoggedIn, async (req,res) =>{
    const services = await pool.query('SELECT * FROM servicio where local=0');
        res.render('servicio/historialBDispositivos',{services});
});
// editar dispositivo
router.get('/reparar/:id',isLoggedIn, async (req,res) =>{
const {id} = req.params;
 const dispositivo = await pool.query('SELECT id FROM servicio WHERE  ID= ?',[id]);
res.render('servicio/editDispositivo',{link:dispositivo[0]});
    
});
router.post('/reparar/:id',async (req, res)=>{
const {id}= req.params;
const {
    reparacion
} = req.body
const reparaciones ={
reparacion,
reparacio_servicio_id: id
};
await pool.query('  INSERT INTO reparaciones_servicio set ?',[reparaciones, id]),
await pool.query('UPDATE servicio SET local = 2  WHERE  id= ?',[id]);
req.flash('success','equipo Reparado')

res.redirect('/servicio')
})



module.exports = router;
