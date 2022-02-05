const express = require('express')
const app = express.Router()
const{ Campus } = require('../db')

app.get('/', async(req,res,next) => {
    try{
        res.send(await Campus.findAll())
    }
    catch(ex){
        next(ex)
    }
})

app.post('/', async(req,res,next) => {
    try{
        const {data} = await Campus.create({
            name: req.body.campus_name, 
            address: req.body.address, 
            imageUrl: '/campus.jpg'
        })
        res.send(data)
    }
    catch(ex){
        next(ex)
    }
})

app.delete('/:id', async(req,res,next) => {
    try{
        const data = await Campus.destroy({
            where: {id: req.params.id}
        })
        res.sendStatus(204)
    }
    catch(ex){
        next(ex)
        console.log("error encountered")
    }
})

app.put('/:id', async(req,res,next) => {
    try{
        const campus = await Campus.findByPk(req.params.id)
        res.send(await campus.update(req.body))
    }
    catch(ex){
        next(ex)
        console.log("error encountered")
    }
})

module.exports = app