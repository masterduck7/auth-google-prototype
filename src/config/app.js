const express = require('express');
const session = require('express-session');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET' 
  })
);

module.exports = app;