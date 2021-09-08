import express from "express"
var router = express.Router()

import { signUp, signIn, logout } from './../controllers/auth.controller';
import { getUsers, getUserById } from './../controllers/user.controller';

//Creer un compte
router.post("/register", signUp)

//Se connecter
router.post("/login", signIn)

//Se deconnecter
router.post("/logout", logout)

//HTTP GET tous les users
router.get("/", getUsers)

//Obtenir le user par id
router.get("/:id", getUserById)

export default router;