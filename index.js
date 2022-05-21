const express = require('express');
const mongo = require('mongodb');
const bodyParser =  require("body-parser");
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     next();
//   });

mongoose.connect('mongodb://localhost/Felicity', {useNewUrlParser: true, useUnifiedTopology: true});

const users = require('./user');
const content = require('./content');

let db = mongoose.connection;
db.once('open', _ => {
    console.log("Connected!");
})

db.on('error', err => {
    console.log("err: ", err);
})

async function addd(obj){
    let objj = new content( obj );
    let resu = await objj.save();
    return (resu);
}

async function addData(req, res, callback){
    console.log(req.body);
    let data = req.body.genre.split(',');
    let dt = req.body.links.split(',');
    let obj = {
        type: req.body.type,
        name: req.body.name,
        genre: data,
        addedBy: req.body.user,
        likes: 0,
        links: dt
    };
    let dat = await callback(obj);
    console.log(dat);
    return (dat);
}

// app.get('/' , (req, res) => {
//     res.send("ok");
// })

app.post('/register', async (req, res) => {
    console.log(req.body);
    let usr = req.body;
    usr['followers'] = [];
    usr['following'] = [];
    usr['favourite'] = [];
    usr['watched'] = [];
    let obj = new users( usr );
    let resu = await obj.save();
    res.json(resu);
})

app.post('/login', async(req, res) => {
    console.log(req.body);
    let user = req.body.username;
    let details = await users.find({
        username : `${user}`
    });
    if(details.password == req.body.password){
        res.send('Login success')
    }
    else{
        res.send('Login failed')
    }
})

app.get('/dashboard', async (req, res) => {

})


app.post('/addContent', async (req, res) => {
    let dt = await addData(req, res, addd);
    res.json(dt);
})

app.get('/getAll', async (req, res) => {
    let data = await content.find();
    res.json(data);
})

app.post('/getOnGenre', async (req, res) => {
    let g = req.body.genre;
    console.log(`${g}`)
    let data = await content.find({
        genre: `${g}`
    });
    res.json(data);
})

let port = 5000;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})