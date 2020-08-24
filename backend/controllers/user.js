// Cifrar la contraseña- Comparar contraseña con bd- token








'use strict'

var validator = require('validator');

var fs = require('fs');
var path = require('path');
var User = require('../models/User');

const passport= require('passport')

const verifytoken = require('./verifytoken')

const jwt = require('jsonwebtoken');
const config = require('../config');
require('../config/passport')


var controller = {
    save:async(req, res) => {
        //Tomar los parametros por post
        var params = req.body;
        //Validar datos(validator, para controlar excepciones, errores)
        try {
            var validate_name = !validator.isEmpty(params.name);
            var validate_email = !validator.isEmpty(params.email);
            var validate_password = !validator.isEmpty(params.password)
            var validate_confirmpassword = !validator.isEmpty(params.confirmpassword)
        } catch (err) {
            return res.status(200).send({
                status: "error",
                message: "Faltan datos p1or enviar",
            });
        }

       

        if (validate_name && validate_email && validate_password && validate_confirmpassword) {
            //Crear el objeto a guardar
            var user = new User();

            //Asignar valores al objeto
            user.name = params.name;
            user.email = params.email;
            user.password = params.password;
            

            user.password = await user.encryptPassword(user.password) //Para encriptar la contraseña
           

            //Guardar en la base de datos
            user.save((err, userStored) => {
                if (err || !userStored) {
                    return res.status(404).send({
                        status: "error",
                        message: "El usuario no se guardo",
                    });
                }

               
                //Devolver respuesta
                return res.status(200).send({
                    status: "success",
                    article: userStored,
                });

               

            });
               
            // const token = jwt.sign({ id: user.id }, config.secret, {
            //     expiresIn: 60 * 60 * 4 // Duracion 4 horas (60*60= 1hs, 1*4= 4hs)
            // });
    
            // res.json({ auth: true, token }); //Envia al usuario el token obtenido
    
    
        } else {
            return res.status(200).send({
                status: "error",
                message: "Los datos no son válidos",
            });
        }
    
    },

    getUsers: (req, res) => {
        const query = User.find({});

        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(2);
        }

        //Find
        query.sort("-_id").exec((err, users) => {
            if (err) {
                return res.status(500).send({
                    status: "Error",
                    message: "Error al devolver los usuarios",
                });
            }
            if (!users) {
                return res.status(404).send({
                    status: "Erorr",
                    message: "No hay usuarios para mostrar",
                });
            }
            return res.status(200).send({
                status: "success",
                users,
            });
        });
    },

    getUser: (req, res) => {
        //Tomar el ID de la url
        var userId = req.params.id;
        //Comprobar que exista
        if(!userId || userId == null){
            return res.status(404).send ({
                status: "Error",
                message: "El usuario no existe",
                                        });
                                            }
    //Buscar el artículo
    User.findById(userId, (err, user) =>{
        if(err || !user){
            return res.status(404).send ({
                status: "Error",
                message: "El usuario no existe!!!!",
            });
        }
        //Enviar respuesta JSON y devolverlo
        return res.status(200).send ({
            status: "success",
            user,
        });
    });
    
    },

    delete: (req, res) => {
        //Tomar el Id de la url
        var userId = req.params.id;
        //Find and delete
        User.findOneAndDelete({ _id: userId }, (err, userRemoved) => {
            if (err) {
                return res.status(200).send({
                    status: "Error",
                    message: "Error al borrar",
                });
            }
            if (!userRemoved) {
                return res.status(404).send({
                    status: "Error",
                    message: "El usuario no se ha borrado",
                });
            }
            //Devolver respuesta
            return res.status(200).send({
                status: "success",
                user: userRemoved,
            });
        });
    },

    signin : async (req, res) => { //Para loguarse
        const {email, password} = req.body; //Extrae del body el contenido de email y password

        
        
        const user = await User.findOne({ email: email }) //Iguala usuario al email 
        if (!user) { //Si no existe el usuario(email), manda msj
            return res.status(401).send("El email no esta registrado")
        }
        const validPassword = await user.matchPassword(password); //Compara la contraseña del usuario con la ingresada en ese momento por el login
        if (!validPassword) {
            // return  res.status(401).send({ auth: false, token: null });
            return res.status(401).send("Contraseña incorrecta")
           
        }
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 60 * 60 * 4
        });
        res.status(200).json({ auth: true, token })
    },


    perfil:   async (req, res) => {
        //Perfil en el que muestra los datos del usuario loguado, excepto la contraseña
        const user = await User.findById(req.userId, { password: 0});
        if (!user) {
            return res.status(404).send("No user found.");
        }
        res.status(200).json(user);
    }
    
    
};






module.exports = controller;