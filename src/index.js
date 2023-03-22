const express = require('express')

const app = express()
require('./db/mongodb')



app.use (express.json())

app.get('/', (req, res) => {
    return res.status(200).send('Api do Restaurante')
})

const MesaRoute = require('./routes/mesaRoute')
app.use(MesaRoute)

const pratoRoute = require('./routes/pratoRoute')
app.use(pratoRoute)

const atendenteRoute = require('./routes/atendenteRoute')
app.use(atendenteRoute)

const carregarModels = require('./models/index')
carregarModels()

app.listen(3000, () => {
    console.log('Api Rodando')
})

