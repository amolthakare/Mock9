const express =require("express");
const {UserModel} = require("../model/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()

let userRoute = express.Router()

userRoute.get("/users",async(req,res)=>{
    try{
        let user = await UserModel.find();
        res.send(user);
    }
    catch(err){
        res.send(err);
    }
    
})

userRoute.post("/register", async (req, res)=>{
    let {name, email, pass,dob,bio} = req.body
    try {
        bcrypt.hash(pass, 4,async (err, securepass)=>{
            if(err){
                res.send("Something went wrong")
            }else{
                let user = new UserModel({name, email, pass:securepass, dob,bio})
                await user.save()
                res.status(201).send("User register success")
            }
        })
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})

userRoute.post("/login", async (req, res)=>{
    let {email, pass} = req.body
    try {
        const user = await UserModel.findOne({email})
        const hash_pass = user.pass
        if(!user){
            res.send("Please Register First")
        }else{
            bcrypt.compare(pass, hash_pass,async (err, result)=>{
                if(result){
                    const token = jwt.sign({userId: user._id}, process.env.key)
                    res.status(201).send({"message":"Login success", "token": token})
                }else{
                    res.send("Something went wrong, check your passowrd ans email")
                }
            })
        }
        
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})


userRoute.get('/users/:id/friends', async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id).populate('friends');
      res.send(user.friends);
    } catch (error) {
      console.error(error);
      res.send({ message: 'error' });
    }
});

userRoute.post('/users/:id/friends', async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      const friend = await UserModel.findById(req.body.friendId);
      user.friendRequests.push(friend);
      await user.save();
      res.send({ message: 'Friend request sent successfully!' });
    } catch (error) {
      console.error(error);
      res.send({ message: 'error' });
    }
});

module.exports={userRoute};