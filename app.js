const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs'); // We wanna compile dynamic html with pug template engine
app.set('views', 'views'); // We wanna use views folder for templates

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);

app.use(shopRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then(result => {
    console.log(result);
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

// app.listen(3000); // is equvalent to the line below
// const server = http.createServer(app); server.listen(3000);
