const express = require('express');
const axios = require('axios');
const env = require('../env.js');

searchRepos = (req, res) => {
  const url = `${env.GH_API_URL}/search/repositories?q=${req.query.q}&${env.AUTH_PARAMS}`;
  axios.get(url).then(response => {
    res.set('Link', response.headers.link);
    res.status(200).json(response.data);
  }).catch((error) => {
      res.status(error.status).json(error.message);
  });

}

module.exports = searchRepos;
