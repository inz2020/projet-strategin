import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.9o3fd.mongodb.net/strategindb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then(
        () => console.log("DB connected"))
    .catch(err => console.log("Failed to connect to DB", err))