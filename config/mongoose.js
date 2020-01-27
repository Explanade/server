const mongoose = require("mongoose")
// const db = process.env.URL_DB + '-' + process.env.NODE_ENV
const db = process.env.MONGO_ATLAS
console.log(db)

mongoose.connect("mongodb+srv://andreasdb:andreasdb@andreasdb-3ly8l.gcp.mongodb.net/explanade?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => {
        console.log(`Explanade connected to atlas`)
    })
    .catch((err) => {
        console.log(err, 'Explanade failed connect to database')
    })