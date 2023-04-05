const chave = '12345'
const tokenHelper = require('./../helpers/token')
function autenticar(funcoes = []) {
    return (req, res, next) => {
        try {
            const token = req.headers.token
            const conteudo = tokenHelper.validarToken(token)
            if (funcoes.includes(conteudo.funcao)) {
                return next()
            }

            return res.status(403).send('Proibido')

        } catch (error) {

            return res.status(401).send({ mensagem: 'Não autorizado', erro: error })
        }

    }
}


module.exports = autenticar