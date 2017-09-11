const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
// ******** IMPORTANT *******: Delete these lines on production
// CLIENT_ID = 725f691a078864d5d24e
// CLIENT_SECRET = b64b21ac0985db70f2e2415d8d4a7db6996c014c

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const GH_API_URL = 'https://api.github.com';
const AUTH_PARAMS = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.get('/', (req, res) => {
  res.send(`Hello from Express!`)
})

app.get('/search/repos/', (req, res) => {
  res.set('Content-Type', 'application/json');
  const url = `${GH_API_URL}/search/repositories?q=${req.query.q}&sort=stars&order=desc&${AUTH_PARAMS}`;

  axios.get(url).then(response => {
    //console.log(response.body);
    res.status(200).json(response.data);
    //res.json({ message: 'hooray! welcome to our api!' })
  }).catch((error) => {
    //res.send(error);
      console.log(error.message);
      res.status(error.status).json(error.message);
      //res.json({ message: 'meeec! welcome to our api!' })
  });

})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
