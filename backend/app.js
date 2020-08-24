'use strict';

//Cargar modulos node para crear el servidor
var express= require("express");
var bodyParser= require ("body-parser");
var cors= require('cors')

const passport = require('passport')
const session= require('express-session')
require('./config/passport')

//Ejecutar express para http
var app = express();

//Cargar archivos rutas
var article_routes = require('./routes/article');
var user_routes = require('./routes/user')



// // Para permitir usuarios y almacenarlos temporalmente
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())


//Cargar Middlewades
app.use(bodyParser.urlencoded({extended:false})); //Carga y utiliza el bodyParse
app.use(bodyParser.json()); //Convierte cualquier peticion en formato json
app.use(cors())





//Añadir prefijos a las rutas
app.use("/api", article_routes); //permite acceder y cargar las rutas
app.use("/user", user_routes)


//Exportar el modulo
module.exports = app; //Cargar y usar este objeto desde afuera