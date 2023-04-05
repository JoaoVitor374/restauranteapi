const express = require('express')
const PratoModel = require('../models/PratoModel')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')

    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage: storage })
const fs = require('fs')
const router = express.Router()

router.get('/prato', async (req, res) => {
    const pratos = await PratoModel.find()
    return res.status(200).send(pratos)

})
router.get('/prato/:id', async (req, res) => {
    const id = req.params.id
    const pratos = await PratoModel.find({ _id: req.params.id })
    return res.status(200).send(pratos)
})

router.post('/prato', upload.single('imagem'), async (req, res) => {
    try {
        const prato = await PratoModel.create({
            nome: req.body.nome,
            preco: req.body.preco,
            descricao: req.body.descricao,
            info: req.body.info,
            imagem: req.file.path
        })
        return res.status(200).send(prato)
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).send('Esse prato já existe')
        }
        return res.status(500).send(error)
    }

})

router.put('/prato/:id', upload.single('imagem'), async (req, res) => {
    const id = req.params.id
    const dadosAtualizados = { ...req.body }
    if (req.file && req.file.path) {
        dadosAtualizados.imagem = req.file.path
    }

    const pratoAtualizado = await PratoModel.findOneAndUpdate({ _id: id }, dadosAtualizados, { upsert: false, new: true })
    return res.status(200).send(pratoAtualizado)



})



router.delete('/prato/:id', async (req, res) => {
    const id = req.params.id;
    const deletado = await PratoModel.findOneAndDelete({ _id: id })
    fs.unlinkSync(deletado.imagem)
    return res.status(200).send(deletado)


})




module.exports = router 