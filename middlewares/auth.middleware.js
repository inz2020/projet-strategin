import jwt from 'jsonwebtoken'
import userModel from '../models/user.model'

//Tester si l user existe 
export const checkUser = (req, res, next) => {
    //verification de notre cookie appélé jwt
    const token = req.cookies.jwt;

    //Si nous avons le cookie, nous verifions ensuite le jeton pour obtenir les donnés.
    //Cependant si une erreur se produit, nous interdisons l'accès au co,ontrolleur
    if (token) {
        jwt.verify(token,
            process.env.TOKEN_SECRET,
            async(err, decodedToken) => {
                if (err) {
                    res.locals.user = null;
                    next()
                } else {
                    let user = await userModel.findById(decodedToken.id)
                    res.locals.user = user
                        //console.log(res.locals.user)
                    next()
                }
            })
    } else {
        res.locals.user = null
        next()
    }

}

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token,
            process.env.TOKEN_SECRET,
            async(err, decodedToken) => {
                if (err) {
                    console.log(err)
                        //Ici, pas de next je veux juste logguer l'erreur
                } else {

                    console.log(decodedToken.id)
                    next()
                }
            })
    } else {
        console.log("No token")
    }
}