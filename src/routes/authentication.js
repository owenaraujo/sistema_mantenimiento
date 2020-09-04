const express = require('express');
const router = express.Router();
const pool = require('../database');


const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');
const { isNotLoggedIn } = require('../lib/auth');

// SIGNUP
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));


// SINGIN
router.get('/signin',isNotLoggedIn, (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
  req.check('username', 'Por favor ingrese un usuario valido').notEmpty();
  req.check('password', 'Contraseña no especificada').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  }
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});


router.get('/profile/administracion',isLoggedIn, async (req,res) =>{
  let services = [];
  // getting rol user
  // const userRol = await pool.query('SELECT rol FROM usuarios WHERE id = ? LIMIT 1',[req.user.id])
  const {rol,id} = req.user;

  // verify is adminstrator
  if (rol == 'administrador'){
      usuarios = await pool.query('SELECT * FROM usuarios');
      res.render('auth/administrador',{usuarios});
      console.log(usuarios)
      return
  }   
  console.log('hay algo mal');
  // services = await pool.query('SELECT * FROM servicio where local=1 AND user_id=?',[id]);
  res.render('auth/autorizacion')
});
router.get('/profile/administracion/activar/:id',async (req,res)=>{
  const {id} = req.params;
  await pool.query('UPDATE  usuarios set estado=1 WHERE  ID= ?',[id])
req.flash('success','usuario activado')

res.redirect('/profile/administracion')
})
router.get('/profile/administracion/desactivar/:id',async (req,res)=>{
  const {id} = req.params;
  await pool.query('UPDATE  usuarios set estado=0 WHERE  ID= ?',[id])
req.flash('success','usuario desactivado')

res.redirect('/profile/administracion')
})


module.exports = router;
