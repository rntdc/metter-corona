const express = require('express');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.render('index');
});

app.listen(7000, function (err) {
    if(err){
        console.log('Erro na inicializacao')
    } else{
        console.log('OK!');
    }
})