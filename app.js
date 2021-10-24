const express = require('express')
const app = express()
const cors = require('cors')
const users = require('./routes/users')
const posts = require('./routes/posts')
const fileUpload = require('express-fileupload');
const dotEnv = require('dotenv')

dotEnv.config()

app.use(cors())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(express.json())
app.use("/api/users", users)
app.use("/api/posts", posts)


//Production for React Heroku
if ( process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


//Run Server
const port = process.env.PORT || 5000;
const server = app.listen(port)