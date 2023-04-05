const jwt = require('jsonwebtoken')
const SEGREDO = process.env.CHAVE_TOKEN
function gerarToken() {
    const usuario = {
        nome: 'Vitor',
        email: "vitor@gmail.com",
        funcao: "admin"
    }
    
    return jwt.sign(usuario, SEGREDO)

}

function validarToken(token){ 
    return jwt.verify(token, SEGREDO)

}

module.exports = {
    gerarToken,
    validarToken
}