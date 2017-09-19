const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const env = require('./env.js');
const searchRepo = require('./_handlers/search-repo.js');
const repoInfo = require('./_handlers/repo-info.js');
const commits = require('./_handlers/commits.js');
const committers = require('./_handlers/committers.js');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Expose-Headers', 'Link');
    res.header('Content-Type', 'application/json');
    next();
}
app.use(allowCrossDomain);

app.get('/', (req, res) => {
  res.send(`Hello from gh-analytics-api. @Perezmarc`)
})

app.get('/v1/repos/:owner/:repo/', repoInfo);

app.get('/v1/repos/:owner/:repo/contributors/', committers);

app.get('/v1/repos/:owner/:repo/commits/', commits);

app.get('/v1/search/repos/', searchRepo);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
