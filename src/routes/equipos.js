const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');









// add maquina
router.get('/add',isLoggedIn,(req,res) => {
res.render ('equipos/add');
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
res.redirect('/equipos');        
}); 
router.get('/', isLoggedIn, async (req,res) =>{
const equipos = await pool.query('SELECT * FROM lista_maquinas WHERE user_id = ?',[req.user.id]);
res.render('equipos/lista_maquinas',{equipos});
});

// delete maquina
router.get('/delete/:id', async (req,res) =>{
const {id} = req.params;
await pool.query('DELETE FROM lista_maquinas WHERE  ID= ?',[id]);
req.flash('success','Equipo Borrado')

res.redirect('/equipos');
});
// edit maquina 
router.get('/edit/:id',isLoggedIn, async (req,res) =>{
const {id} = req.params;
const equipos = await pool.query('SELECT * FROM lista_maquinas WHERE  ID= ?',[id]);
res.render('equipos/edit',{link:equipos[0]});

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

res.redirect('/equipos')
})
// detalles
router.get('/detalles/:id',isLoggedIn, async (req,res) =>{
    const {id} = req.params;
    const equipo = await pool.query('SELECT * FROM lista_maquinas WHERE  id= ?',[id]);
    res.render('equipos/detalles',{link:equipo[0]});
    
    });









// serviciop tecmico

module.exports = router;