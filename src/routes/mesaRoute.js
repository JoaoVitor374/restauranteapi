const express = require('express')
const DB_MESAS = require('../db/MesaDB')
const MesaModel = require('../models/MesaModel')


const router = express.Router()

router.get('/mesa', async (req, res) => {
    const mesas = await MesaModel.find()
    return res.status(200).send(mesas)
    
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
    
  


router.delete('/mesa/:numero', async (req, res) => {
    const numero = req.params.numero;
    const deletado = await MesaModel.findOneAndDelete({numero: numero})
    if (!deletado || !deletado._id) {
        return res.status(404).send('Mesa não existe')
        
    }
    return res.status(200).send(deletado)
 
   
})
 
/*router.delete('/mesa/:numero', async (req, res) => {
    const numero = req.params.numero;
     await MesaModel.findOneAndRemove({numero: numero})
    return res.status(200).send()
 
   
})*/
 


module.exports = router 