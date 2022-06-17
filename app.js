const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);

app.use('/', (req, res, next) => {
  console.log('In another middleware');
  res.send('<h1>Hello from Express</h1>');
})

app.listen(3000); // is equvalent to the line below
// const server = http.createServer(app); server.listen(3000);
