const express = require('express')
const app = express.Router()
const{ Student } = require('../db')

app.get('/', async(req,res,next) => {
    try{
        res.send(await Student.findAll())
    }
    catch(ex){
        next(ex)
    }
})
/*
app.get("/:id", async (req, res, next) => {
    try {
      res.send(await Student.findOne({
            where: {id: req.params.id}
      })
      );
    } catch (error) {
      next(error);
    }
});
*/
app.post('/', async(req,res,next) => {
    try{
        const data = await Student.create({first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email,imageUrl: '/student.jpg'})
        res.send(data)
    }
    catch(ex){
        next(ex)
    }
})

app.delete('/:id', async(req,res,next) => {
    try{
        const data = await Student.destroy({
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
    console.log("ID " + req.params.id)
    console.log(req.body)
    try{
        const student = await Student.findByPk(req.params.id)
        await student.update(req.body)
        await student.save()
        res.send(student)
    }
    catch(ex){
        next(ex)
        console.log("error encountered")
    }
})

module.exports = app