const mongoose = require('mongoose')
const URI = 'mongodb+srv://admin:123456!@cluster0.hdvnuvv.mongodb.net/?retryWrites=true&w=majority'




mongoose.connect(URI)
    .then(db => console.log("DB connection established"))
    .catch(err => console.error(err))

module.exports = mongoose;