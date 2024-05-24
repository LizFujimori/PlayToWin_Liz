require("dotenv").config();
const conn = require("./db/conn");

const Usuario = require("./moldels/Usuario");

conn
    .sync()
    .authenticate()
    .then(() => {
       console.log("conectado e sync ao db :P");
    })
    .catch((err) => {
     console.log("erro :(" + err);
    });



// conn
//   .authenticate()
//  .then(() => {
//       console.log("conectado ao db :P");
// })
//  .catch((err) => {
//     console.log("erro :(" + err);
//   });