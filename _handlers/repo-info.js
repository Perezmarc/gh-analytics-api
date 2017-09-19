const express = require('express');
const axios = require('axios');
const env = require('../env.js');

repoInfo = (req, res, next) => {
  const url = `${env.GH_API_URL}/repos/${req.params.owner}/${req.params.repo}?${env.AUTH_PARAMS}`;
  axios.get(url).then(response => {
    res.status(200).json(response.data);
  }).catch((error) => {
      res.json({"message": error.message});
  });
}

module.exports = repoInfo;
