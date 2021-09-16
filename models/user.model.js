import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

//j'utilise la librairie validator pour verifier l'email du user
import { isEmail } from 'validator'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true,
        validate: [isEmail],
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    }
})

//Crypter les passwords à la sortie de la BD
userSchema.pre("save", async function(next) {
    //bcrypt va generer une serie de code qui va saler le password
    const salt = await bcrypt.genSalt()
        //On ajoute ce code salé au password
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

//Crypter les password avant de les mettre dans la BD
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) { return user }
        throw Error('Incorrect Password!!')
    }
}

const userModel = mongoose.model("user", userSchema)
export default userModel