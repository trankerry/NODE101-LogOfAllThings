const express = require('express');
const fs = require('fs');
const app = express();
const csv = require('csvtojson/v2')

app.use((req, res, next) => {
  // write your logging code here
  let agent = req.headers['user-agent'].replace(",", '');
  let time = new Date;
  let method = req.method;
  let resource = req.path;
  let version = `${req.protocol.toUpperCase()}/${req.httpVersion}`;
  let status = res.statusCode;

  let logCode = `${agent},${time.toISOString()},${method},${resource},${version},${status}`;

  console.log(logCode);
  //fs.appendFile( path, data[, options], callback )
  fs.appendFile('log.csv',logCode, (err) => {
    if (err) throw err;
  });
  next();
});



app.get('/', (req, res) => {
  // write your code to respond "ok" here
  res.status(200).send('ok');
});

app.get('/logs', (req, res) => {
  // write your code to return a json object containing the log data here
  csv()
    .fromFile('./log.csv')
    .then((obj) => {
      res.json(obj);
    })

});

module.exports = app;
