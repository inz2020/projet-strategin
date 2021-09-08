import express from "express"
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, './config/.env') });
require('./config/database')

import cookieParser from 'cookie-parser'
const app = express()
import userRoutes from "./routes/user.route"
import cors from "cors"

//import des middlewares
import { checkUser, requireAuth } from './middlewares/auth.middleware'

//creation de variable contenant tout ce qu'on accepte
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'prefLightContinue': false


}
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
    //Utilisation de la fonction middleware checkUser pour n'importe quelle route ayant un token
app.get('*', checkUser)

//On connecte automatiquement le user à son token 
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

//Les middlewares à passer
app.use('/api/users', userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})