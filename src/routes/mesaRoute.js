const express = require('express')
const DB_MESAS = require('../db/MesaDB')
const MesaModel = require('../models/MesaModel')


const router = express.Router()

router.get('/mesa', (req, res) => {
    return res.status(200).send(DB_MESAS)
    
})

router.post('/mesa', async (req,res) => {
    
    try {
        const mesaCriada = await MesaModel.create({
            numero: req.body.numero
        })
        return res.status(200).send(mesaCriada)
    } catch (error) {
        if(error.code == 11000) {
            return res.status(400).send('Numero de Mesa já existe')
        }
    
        return res.status(500).send(error)
    }
    })
    
  


router.delete('/mesa/:numero', (req, res) => {
    const numero = req.params.numero;
    const index = DB_MESAS.findIndex(mesa => mesa.numero == numero)
    if(index != -1) {
        DB_MESAS.splice(index, 1)
        return res.status(200).send('Mesa deletada com sucesso')

    }

   
    return res.status(404).send('Mesa não encontrada')
})
 



module.exports = router 