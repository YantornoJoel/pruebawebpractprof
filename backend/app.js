'use strict';

//Cargar modulos node para crear el servidor
var express= require("express");
var bodyParser= require ("body-parser");
var cors= require('cors')

const passport = require('passport')
const session= require('express-session')

//Ejecutar express para http
var app = express();

//Cargar archivos rutas
var article_routes = require('./routes/article');
var user_routes = require('./routes/user')


//Cargar Middlewades
app.use(bodyParser.urlencoded({extended:false})); //Carga y utiliza el bodyParse
app.use(bodyParser.json()); //Convierte cualquier peticion en formato json
app.use(cors())


//Var globales



// app.use((req, res, next) =>{
//         res.header("Access-Control-Allow-Origin", "*");
// 		res.header("Access-Control-Allow-Credentials", "true");
// 		res.header("Access-Control-Max-Age", "1800");
// 		res.header("Access-Control-Allow-Headers", "content-type");
// 		res.header("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
// 		// res.setHeader("Content-Type", "application/json;charset=utf-8");
// next()
// }
// )

//Añadir prefijos a las rutas
app.use("/api", article_routes); //permite acceder y cargar las rutas
app.use("/user", user_routes)


//Exportar el modulo
module.exports = app; //Cargar y usar este objeto desde afuera
