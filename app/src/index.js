const express = require("express");
const router = require("./router");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv/config");
const session = require('express-session');
const cookieParser = require("cookie-parser");

const server = express();

const oneDay = 1000 * 60 * 60 * 24;
server.set('trust proxy', 1);
server.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: oneDay }
}));
server.use(cookieParser());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '/views/'));
server.use('/', express.static('src/public'));

// Rotas
server.use('/', router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
})
