const http = require('http');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();

app.engine('hbs', expressHbs());
app.set('view engine', 'hbs'); // We wanna compile dynamic html with pug template engine
app.set('views', 'views'); // We wanna use views folder for templates

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { docTitle: 'Page Not Found' });
});

app.listen(3000); // is equvalent to the line below
// const server = http.createServer(app); server.listen(3000);
