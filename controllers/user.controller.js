import userModel from '../models/user.model'
import mongoose from 'mongoose'
const objectID = mongoose.Types.ObjectId;

//Liste de tous les users
export const getUsers = async(req, res) => {
    //Je ne veux pas que les mot de passe transitent en clair dans le DB
    const users = await userModel.find().select('-password')
    res.status(200).json(users)
}

//Info d'un seul user
module.exports.getUserById = (req, res) => {
    console.log(req.params)
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID Unknown' + req.params.id)

    userModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID Unknown: ' + err)
    }).select('-password')
}