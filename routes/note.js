const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middleware/authenticator");
const { Note } = require("../models/noteModel");
const note = express.Router();
note.use(authenticator);
note.get("/",async(req,res)=>{
    let token = req.headers.authorization
    jwt.verify(token,"nandan",async(err,decode)=>{
        try {
            let data = await Note.find({user:decode.userId});
            console.log("inside backend path");
            res.send({
                data:data,
                message:"Success",
                status:1
            })
        } catch (error) {
            res.send({
                message:error.message,
                status:0
            })
        }        
    })
})

note.post("/create",async(req,res)=>{
    try {
        let note = new Note(req.body)
        await note.save()
        res.send({
            message:"Note created",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
})

note.patch("/",async(req,res)=>{
    let {id} = req.headers
    try {
        await Note.findByIdAndUpdate({_id:id},req.body)
        res.send({
            message:"Note updated",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }
})


note.delete("/",async(req,res)=>{
    let {id} = req.headers
    try {
        await Note.findByIdAndDelete({_id:id})
        res.send({
            message:"Note deleted",
            status:1
        })
    } catch (error) {
        res.send({
            message:error.message,
            status:0
        })
    }  
})

module.exports = {
 note,
};