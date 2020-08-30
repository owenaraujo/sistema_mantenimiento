const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  cod: /^([a-z]{2})\-([\d]{1})/, // 7 a 14 numeros.

};

const validateUser = (el) => {
  let msg = document.querySelector("#msgUser");

  if (el.value === "") {
    msg.textContent = "Completa este campo";
    return;
  }

  if (!expresiones.usuario.test(el.value)) {
    msg.textContent = "Formato de Usuario no valido";
    return;
  }
  msg.textContent = "";
};
const validateEmpty = (el) => {
  let msg = document.querySelector("#msgPass");

  if (el.value === "") {
    msg.textContent = "Completa este campo";
    return;
  }

  if (!expresiones.password.test(el.value)) {
    msg.textContent = "Formato de constraseña no valido";
    return;
  }
  msg.textContent = "";
};


const validateCod = (el) => {
  // let msg = document.querySelector("#msgCod");

  // if (el.value === "") {
  //   msg.textContent = "Completa este campo";
  //   return;
  // }

  // if (!expresiones.cod.test(el.value)) {
  //   msg.textContent = "Formato no valido";
  //   return;
  // }
  // msg.textContent = "";
let str = el.value;
  el.value = str
    .replace(/^([a-z]{2})([0-9]{2})/, "$1-$2")
};