const express = require('express');
const router = express.Router();
const {addDoc, serverTimestamp, doc, collection, query, where, getDocs} = require('firebase/firestore')
const {db} = require('../firebase')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//Sign Up
router.post("/create", async (req,res)=>{
    //Check Username
    let q = query(collection(db, "users"), where("username","==",req.body.username))
    let user = await getDocs(q)
    if(!user.empty) {
        res.status(400).send("Username already taken")
        return false;
    }
    //Check Email
    q = query(collection(db, "users"), where("email","==",req.body.email))
    user = await getDocs(q)
    if(!user.empty) {
        res.status(400).send("Email already taken")
        return false;
    }

    //Encrypt Password
    let password = req.body.password
    try {
        password = await bcrypt.hash(req.body.password, 10)
    } catch(error) {
        res.status(500).send("Internal Server Error.")
        return false;
    }

    //Add to Doc Firebase
    try {
        const doc = await addDoc(collection(db, "users"), {
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            password: password,
            timestamp: serverTimestamp(),
        })
        //Generate JSON WebToken
        const token = jwt.sign({id:doc.id, username:req.body.username, email: req.body.email, name: req.body.name}, "InstagramCloneAppSunil")
        res.send(token)
    } catch (error) {
        res.status(500).send("Internal Server Error.")
        return false;
    }
})


//Sign In
router.post("/login", async(req, res)=>{
    //Get User
    const q = query(collection(db, "users"), where("username","==",req.body.username))
    let user = await getDocs(q)
    if(!user.empty) {
        //Get User
        user.forEach(u=>{
            user = u.data()
            user.id = u.id
        })
        //Match Password
        const password = await bcrypt.compare(req.body.password, user.password)
        if(!password) return res.status(400).send("Sorry, your password was incorrect. Please double-check your password.")
        //Generate JSON WebToken
        const token = jwt.sign({id: user.id, username:user.username, email:user.email, name: user.name}, "InstagramCloneAppSunil")
        res.send(token)
    } else {
        res.status(400).send("The username you entered doesn't belong to an account. Please check your username and try again.")
    }
})

module.exports = router