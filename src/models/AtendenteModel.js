const mongoose = require('mongoose')


const AtendenteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,

    },

    cpf: {
        type: String,
        required: true,
        unique: true

    },

    telefone: String,
    email: {
        type: String,
        default: null

    },
    senha: {
    type: String,
    required: true
}

}, { timestamps: true })

const AtendenteModel = mongoose.model('Atendente', AtendenteSchema)
module.exports = AtendenteModel