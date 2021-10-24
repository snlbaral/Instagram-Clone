const express = require('express');
const router = express.Router();
const {addDoc,collection,serverTimestamp, updateDoc, doc, onSnapshot, orderBy} = require('firebase/firestore')
const {ref,getDownloadURL, uploadString, uploadBytes} = require('firebase/storage')
const {db,storage} = require('../firebase')
const jwt = require('jsonwebtoken');
const fs = require('fs')

router.post("/create", async (req,res)=>{
    const token = req.header('x_access_token');
    if(!token) return res.status(401).send("Unauthorized.")
    let decode = null
    try {
        decode = jwt.verify(token, 'InstagramCloneAppSunil')
    } catch (err) {
        res.status(400).send("Invalid or Expired Authorization.")
        return false
    }

    try {
        const document = await addDoc(collection(db, "posts"),{
            username: decode.username,
            user_id: decode.id,
            caption: req.body.caption,
            profileImg: null,
            timestamp: serverTimestamp()
        })
        var file = fs.readFileSync(req.files.image.tempFilePath, 'base64');
      
        const imgUp = ref(storage, `posts/${document.id}/${req.files.image.name}`)
        let downloadUrl;
        await uploadString(imgUp, file, "base64").then(async res=>{
            downloadUrl = await getDownloadURL(imgUp)
            await updateDoc(doc(db, 'posts', document.id),{
                image: downloadUrl
            })
        })
        res.send({image:downloadUrl,user:decode, post:req.body})
    } catch(err) {
        console.log(err.message)
        res.status(400).send("Failed to make a post.")
    }
})

module.exports = router