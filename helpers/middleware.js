const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_SESSION;
const User = require("../models/user");


const withAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            res.locals.isUserLoggedIn = false;
            next()
        } else {
            // verificamos el token
            const decoded = await jwt.verify(token, secret)

            // si el token valida, configuramos req.user con el valor del usuario decodificado
            const nombreID = decoded.userID

            // console.log(nombreUser)
            // esto nos sirve para hacer validaciones en las plantillas de hbs
            res.locals.currentUserInfo = await User.findById(nombreID).select("-password");
            res.locals.isUserLoggedIn = true
            next()
        }
    } catch (error) {
        // if (error.name =  'TokenExpiredError') {

        // }
        console.log(error);
        res.locals.isUserLoggedIn = false;
        // res.locals.message = "Token Expired"
        next();
    }

}
module.exports = withAuth;
