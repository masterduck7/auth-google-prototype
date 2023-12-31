require('dotenv').config();

require('./src/config/db');
require('./src/config/passport');

const app = require('./src/config/app');
const indexRoutes=require('./src/routes/index');

app.use("/", indexRoutes);

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));