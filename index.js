require("dotenv").config();
const conn = require("./db/conn");

const Usuario = require("./moldels/Usuario");
const Jogo = require("./models/Jogo")

const express = require("express");
const app = express();

const handlebars = require ("express-handlebars")

app.engine("handlebars", handlebars.engine());

app.set("view engine", "handlebars");

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.get("/usuarios/novo", (req, res) => {
    res.render('formUsuario');
});

app.get("/", (req, res) => {
    res.render('home');
});

app.get("/usuarios", async (req, res) => {
    const usuarios = await Usuario.findAll({ raw: true})
    res.render('usuarios', {usuarios});
});

app.post("/usuarios/novo", async (req, res) => {
    const dadosUsuario = {
        nickname: req.body.nickname,
        nome: req.body.nome,
    };
    const usuario = await Usuario.create(dadosUsuario);
    res.send("Usuario inserido com o id: " + usuario.id)
});

app.get("/jogos/novo", (req, res) => {
    res.render('jogo');
});

app.post("/jogos/novo", async (rep, res) => {
    const dadosJogo = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        precoB: req.body.precoB,
    };
    const jogo = await Jogo.create(dadosJogo);
    res.send("Jogo inserido com o id: " + jogo.id)
});

app.get("/usuarios/:id/atualizar", async (req, res) => {
    const id = req.params.id;
    const usuario = await Usuario.findByPk(id, { raw: true});
    res.render("formUsuario"), { usuario };
})

app.post("/usuarios/:id/atualizar", async (req, res) => {
    const id = req.params.id;
    const dadosUsuario = {
        nickname: req.body.nickname,
        nome: req.body.nome,
    };
    const registroAfetados = await Usuario.update(dadosUsuario, { where: { id: id }});
        if (registroAfetados > 0) {
            res.redirect("/usuarios");
        } else {
            res.send("Erro ao atualizar :/");
        }
});

app.post("usuarios/excluir", async (req, res) => {
    const id = req.body.id;
    const registroAfetados = await Usuario.destroy({ where: { id: id }});
        if (registroAfetados > 0) {
            res.redirect("/usuarios");
        } else {
            res.send("Erro ao excluir :/");
    }1
})

app.listen(8000, () => {
    console.log("rodandinho :P");
});

conn
    .sync()
    .authenticate()
    .then(() => {
       console.log("conectado e sync ao db :P");
    })
    .catch((err) => {
     console.log("erro :( " + err);
    });

// conn
//   .authenticate()
//  .then(() => {
//       console.log("conectado ao db :P");
// })
//  .catch((err) => {
//     console.log("erro :(" + err);
//   });