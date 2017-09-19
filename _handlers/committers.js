const express = require('express');
const axios = require('axios');
const env = require('../env.js');

committers = (req, res, next) => {
  const per_page = req.params.per_page || '10'; // This endpoint has no pagination available
  const url = `${env.GH_API_URL}/repos/${req.params.owner}/${req.params.repo}/stats/contributors?${env.AUTH_PARAMS}`;
  axios.get(url).then(response => {
    res.set('Link', response.headers.link);
    res.status(200).json(response.data.reverse());
  }).catch((error) => {
      res.json({"message": error.message});
  });
}

module.exports = committers;
