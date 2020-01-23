const mongoose = require("mongoose")
// const db = process.env.URL_DB
const db = process.env.MONGO_ATLAS

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => {
        console.log(`explanade connected to atlas`)
    })
    .catch((err) => {
        console.log(err, 'explanade failed connect to database')
    })