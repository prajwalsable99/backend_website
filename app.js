// lib required
const express = require("express");
const fs= require("fs")
const app= express();
const port = 80;


// to add static files
app.use('/static',express.static('static'))


//for backend

app.use(express.urlencoded())
//mongoose

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gamecontact', {useNewUrlParser: true});

const bodyparser = require("body-parser")


//for pug
const path = require('path');
const { stringify } = require("querystring");



// puug  html temp
app.set('view engine','pug');


app.set('views',path.join(__dirname,'views'));

app.get('/',  (req, res)=> {
    res.status(200).render('index.pug')
  });


  app.get('/contacts',  (req, res)=> {
    res.status(200).render('contacts.pug')
  });


//mongoose  forard
const contactschema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,  

});

const contactclass = mongoose.model('contactclass', contactschema);


app.post('/contact',  (req, res)=> {
  var mydata  = new contactclass(req.body);
  mydata.save().then(()=>{res.send("sent successfully to dbs")}).catch(()=>{res.send("not sent to dbs")});

});











// serving
  app.listen(port,()=>{
    console.log(` app running on  port ${port}`)
});
