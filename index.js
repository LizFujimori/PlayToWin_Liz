require("dotenv").config();
const conn = require("./db/conn");

conn
    .authenticate()
    .then(() => {
        console.log("conectado ao db :P");
    })
    .catch((err) => {
        console.log("erro :(" + err);
    });