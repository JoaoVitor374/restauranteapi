const express = require('express')
const PedidoModel = require('../models/PedidoModel')
const AtendenteModel = require('../models/AtendenteModel')
const MesaModel = require('../models/MesaModel')
const PratoModel = require('../models/PratoModel')



const router = express.Router()

router.get('/pedido', async (req, res) => {
    const pedidos = await PedidoModel.find()
    return res.status(200).send(pedidos)
})

router.post('/pedido', async (req, res) => {
    const { atendente_id, mesa_id, pratos } = req.body;
    /* 
        const atendente_id = req.body.atendente_id
        const mesa_id = req.body.mesa_id
        const pratos = req.body.pratos
    */

    // buscar a mesa por ID
    const mesa = await MesaModel.findOne({ _id: mesa_id })
    
    if(!mesa || !mesa._id) {
        return res.status(400).send("Mesa informada não existe!")
    }

    // buscar o atendente por ID
    const atendente = await AtendenteModel.findOne({_id: atendente_id})
    if(!atendente || !atendente._id) {
        return res.status(400).send("Atendente não existe!")
    }
    // Buscar todos os pratos por ID
    const listaPratosFinal = []
    for (let index = 0; index < pratos.length; index++) {
        const pratoItem = pratos[index];
        const pratoBD = await PratoModel.findOne({ _id: pratoItem.prato_id })
        if(!pratoBD || !pratoBD._id) {
            return res.status(400).send("Prato não existe!")
        }
        listaPratosFinal.push({
           quantidade: pratoItem.quantidade,
           prato_id: pratoBD._id,
           nome: pratoBD.nome,
           preco: pratoBD.preco,
           info: pratoBD.info,
        })
    }
    // criar o Pedido
    const pedidoCriado = await PedidoModel.create({
        atendente: {
            atendente_id: atendente._id,
            nome: atendente.nome,
            cpf: atendente.cpf,
            email: atendente.email,
        },
        mesa: {
            numero: mesa.numero
        },
        pratos: listaPratosFinal,
        status: 'Em Preparo'
    })
    return res.status(200).send(pedidoCriado)
})



router.put('/pedido/:id', async (req, res) => {
    const id = req.params.id
     const pedidoAtualizado = await PedidoModel.findOneAndUpdate({_id: id}, req.body, {upsert: false, new: true})
     if (!pedidoAtualizado || !pedidoAtualizado._id) {
         return res.status(404).send('pedido não existe')
         
}
return res.status(200).send(pedidoAtualizado)
})

router.put('/finalizar-pedido/:id', async (req, res) => {
    const pedido = await PedidoModel.findOne({ _id: req.params.id })

    if (!pedido || pedido._id) {
        return res.status(400).send('Pedido não encontrado')
    }

    pedido.status = 'Finalizado'

    for (const prato of pedido.pratos) {
        let soma = 0
        const precoTotalPrato = prato.preco * prato.quantidade
        soma += precoTotalPrato

    }
    const pedidoFinalizado = await PedidoModel.findOneAndUpdate(
        {_id: pedido._id}, pedido, {upsert: false, new: true}

        
    )
   return res.status(200).send({pedido: pedidoFinalizado, valorTotal: soma})

})


router.get('/pedido/:id', async (req, res) =>{
    const { id }= req.params;
    const pedido = await PedidoModel.findOne({_id: id})

    if(!pedido || !pedido._id) {
        return res.status(404).send('Pedido Inexistente!')

    }
    return res.status(200).send(pedido)

})

module.exports = router