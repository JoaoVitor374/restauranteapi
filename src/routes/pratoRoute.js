const express = require('express')
const DB_PRATOS = require('../db/PratoDB')

const router = express.Router()

router.get('/prato', (req, res) => {
    return res.status(200).send(DB_PRATOS)

})

router.post('/prato', (req,res) => {
    DB_PRATOS.push(req.body)
    return res.status(200).send('Prato criado com sucesso')
})




module.exports = router 