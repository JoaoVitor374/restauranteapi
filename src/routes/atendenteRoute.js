const express = require('express')
const AtendenteModel = require('../models/AtendenteModel')
const md5 = require('md5')


const router = express.Router()

router.get('/atendente', async (req, res) => {
    const atendentes = await AtendenteModel.find({})
    return res.status(200).send(atendentes)

})

router.get('/atendente/:cpf', async (req, res) => {
    const cpf = req.params.cpf
    const atendentesCpf = await AtendenteModel.findOne({cpf})
    return res.status(200).send(atendentesCpf)
})

router.post('/atendente', async (req,res) => {
    try { 
        const atendenteAdicionado = await AtendenteModel.create({
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: md5(req.body.senha)
        })
        return res.status(200).send(atendenteAdicionado)
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).send('Atendente já existe')
            
        }
        return res.status(500).send(error)
    }
   
})

router.put('/atendente/:id', async (req, res) => {
   const id = req.params.id
    const atendenteAtualizado = await AtendenteModel.findOneAndUpdate({_id: id}, req.body, {upsert: false, new: true})
    if (!atendenteAtualizado || !atendenteAtualizado._id) {
        return res.status(404).send('Atendente não existe')
        
    }
   
    
    return res.status(200).send(atendenteAtualizado)
})
    




router.delete('/atendente/:id', async (req, res) => {
    const id = req.params.id;
    const atendenteDeletado = await AtendenteModel.findOneAndDelete({_id: id})
    if (!atendenteDeletado || !atendenteDeletado._id) {
        return res.status(404).send('Atendente não existe')
        
    }
    return res.status(200).send(atendenteDeletado)
})

module.exports = router 