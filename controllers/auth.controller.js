import userModel from '../models/user.model'
import jwt from 'jsonwebtoken'
import { signUpErrors, signInErrors } from '../utils/errors.utils'


//Creation de la clé secrete generée à partir de l'id user de mon TOKEN_SECRET que j'ai defini dand .env

//Un delai pour 3 jours d'expiration
const maxAge = 24 * 60 * 60 * 3 * 1000
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge })
}


//creation de compte
export const signUp = async(req, res) => {
    console.log(req.body)

    const { email, password } = req.body
    try {
        const user = await userModel.create({ email, password })
        res.status(201).json({ user: user._id })
    } catch (err) {
        const errors = signUpErrors(err)
        res.status(400).send({ errors })
    }
}

//se connecter à son compte
export const signIn = async(req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.login(email, password)
        const token = createToken(user._id)

        //Creation d'un cookie nommé jwt
        res.cookie("jwt", token, { httpOnly: true, maxAge })

        //Afficher l'id de cet user dans le body de la reponse
        res.status(200).json({ user: user._id })

    } catch (err) {
        const errors = signInErrors(err)
        res.status(400).send({ errors })
    }
}


//Deconnexion de l'user
export const logout = async(req, res) => {
    //On retire le token ou la cookie associé precedememt à cet user
    res.cookie('jwt', '', { maxAge: 1 })
        //Puis on le redirige vers la page d'acceuil
    res.redirect('/')
}