require('dotenv').config();
require('./src/config/passport');
const app = require('./src/config/app');

app.get('/', function(req, res) {
    res.render('pages/auth');
  });

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));