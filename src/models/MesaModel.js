const mongoose = require('mongoose')
 
const MesaSchema = new mongoose.Schema({
    numero: {
        type: String,
        unique: true,
        required: true


    }
}, {timestamps: true})

const MesaModel = mongoose.model('Mesa', MesaSchema)



module.exports = MesaModel