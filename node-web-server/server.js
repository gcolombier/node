
const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

var app = express();

app.use(express.static(__dirname+ '/public'));
hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) {
      console.log('Unable to open server.log.')
    }
  });
  next();
});

app.use((req,res,next) => {
  res.render('maintenance.hbs');
});


hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req,res) => {
  res.render('home.hbs',{
    pageTitle: "Welcome Page",
    welcomeMessage: "welcome to my home page"
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs',{
    pageTitle: "About Page",
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage:"This is a bad request"
  });
});

app.listen(3000, () => {
  console.log('server up on port 3000');
});
