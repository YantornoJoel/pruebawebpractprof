const helpers = {}


//MIDDLEWARE, FUNCION QUE SE EJECUTA DEPENDIENDO LO QUE LE PASEMOS
helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.status(200)("No autorizado")
    res.redirect('/users/signin')
};


module.exports = helpers;