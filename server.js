require('dotenv').config();

const session = require('express-session');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views')

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', function(req, res) {
    res.render('pages/auth');
  });

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));

module.exports = app;