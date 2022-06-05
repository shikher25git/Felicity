const express = require('express');
const mongo = require('mongodb');
const bodyParser =  require("body-parser");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = express();

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express); 

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/views'));

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
        links: dt
    };
    let dat = await callback(obj);
    console.log(dat);
    return (dat);
}

app.get('/' , (req, res) => {
    res.render('index.ejs');
})

app.post('/register', async (req, res) => {
    console.log(req.body);
    let usr = req.body;
    let data = await users.find({
        username: `${req.body.username}`
    });
    if(data.length > 0){
        res.json({'message': 'user exists'})
    }
    else{
        let pass = req.body.password;
        bcrypt.hash(pass, process.env.ITERATIONS, async (err, hash) => {
            if(err){
                throw err;
            }
            usr.password = hash;
            let obj = new users( usr );
            let resu = await obj.save();
            res.redirect(resu, {message: 'Please login'});
        })
        
    }
})

app.post('/login', async(req, res) => {
    console.log(req.body);
    let user = req.body.username;
    let details = await users.find({
        username : `${user}`
    });
    console.log(details)
    if(details.length == 0){
        res.send('not found')
    }
    bcrypt.compare(req.body.password, details[0].password, (err, resu) => {
        if(err)
            throw err;
        if(resu){
            jwt.sign({username: user}, process.env.SECRET_KEY, (err, token) => {
                if(err)
                    throw err;
                res.send(token)
            })
        }
        else{
            res.send('failed')
        }
    })
})

app.get('/register', (req, res) => {
    res.render('register.ejs', {})
})

app.get('/test', (req, res) => {
    res.render('users.ejs')
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

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/about', (req, res) => {
    res.render('about.ejs')
})

app.get('/products', (req, res) => {
    res.render('products.ejs')
})

app.get('/store', (req, res) => {
    res.render('store.ejs')
})

let port = 5000;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})