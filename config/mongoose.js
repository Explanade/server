const mongoose = require("mongoose")
const db = process.env.URL_DB
// const db = process.env.MONGO_ATLASs

mongoose.connect(db, {
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