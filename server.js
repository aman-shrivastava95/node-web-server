const express = require('express') ;
const hbs = require('hbs') ;
const fs = require('fs') ;
var app = express() ;

const port = process.env.PORT || 3000 ;

hbs.registerPartials(__dirname +'/views/partials') ;
app.set('view engine', 'hbs') ;

//middleware function for delivering static content
//midlleware is executed in the order they are defined.

//registring another middleware
app.use((req,res,next) => {
    var now = new Date().toString() ;
    var log = `${now}: ${req.method} ${req.url}` ;
    console.log();
    fs.appendFile('server.log', log + '\n',(err) =>{
        if(err)
        console.log('unable to append to server log');  
    })
    //further app will not run without it
    next() ;
}) ;

app.use((req,res,next) => {
    res.render('maintenance.hbs')
}) ;

app.use(express.static(__dirname + '/public')) ;

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear() ;
})
hbs.registerHelper('scream',(text) => { 
    return text.toUpperCase() ;
})
//registring handler for http get request
app.get('/',(req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage:'Hello user , welcome!!!!'
    })
}) ;

//creating another route
app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    })
}) ;

app.get("/bad",(req, res) => {
    res.send({
        errorMessage:'Error Handling Request'
    })
})

//common port for developing locally
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
}) ;