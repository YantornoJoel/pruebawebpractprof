const passport = require('passport') 
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')


passport.use( new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = await User.findOne({email: email})
    if(!user){
        return done(null, false, {message: "Usuario no encontrado"})
    } else{
        const match = await user.matchPassword(password)
        if(match){
            return done(null, user)
        } else{
            return done(null, false, {message: "1Contraseña incorrecta"})    
        }
    }
}));


//Si el usuario se logua se almacena
passport.serializeUser((user, done) =>{
    done(null, user.id)
})


//Toma un id y genera un usuario, proceso inverso al anterior
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})
