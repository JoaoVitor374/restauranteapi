const express = require('express')
const DB_ATENDENTE = require('../db/AtendenteDB')

const router = express.Router()

router.get('/atendente', (req, res) => {
    return res.status(200).send(DB_ATENDENTE)

})

router.post('/atendente', (req,res) => {
    DB_ATENDENTE.push(req.body)
    return res.status(200).send('Atendente adicionado com sucesso')
})

router.put('/atendente/:id', (req, res) => {
   const id = req.params.id;
   const index = DB_ATENDENTE.findIndex(atendente => atendente.id == id)
   if(index != -1) {
    DB_ATENDENTE[index] = {
        id: req.params.id,
        nome: req.body.nome,
        telefone: req.body.telefone
    }
    return res.status(200).send('Atendente atualizado com sucesso')
}
    
return res.status(404).send(`Atendente ${req.params.id} não encontrado`)

})

router.delete('/atendente/:id', (req, res) => {
    const id = req.params.id;
    const index = DB_ATENDENTE.findIndex(atendente => atendente.id == id)
    if(index != -1) {
        DB_ATENDENTE.splice(index, 1)
        return res.status(200).send('Atendente deletado com sucesso')

    }

   
    return res.status(404).send('Atendente não encontrado')
})

module.exports = router 