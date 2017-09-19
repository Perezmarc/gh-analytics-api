const express = require('express');
const axios = require('axios');
const env = require('../env.js');

commits = (req, res, next) => {
  const per_page = '100';
  const url = `${env.GH_API_URL}/repos/${req.params.owner}/${req.params.repo}/commits?per_page=${per_page}&${env.AUTH_PARAMS}`;
  axios.get(url).then(response => {
    res.set('Link', response.headers.link);
    let results = {};
    results = response.data.reverse().map(commit => {
        commit.commit.committer.date = commit.commit.committer.date.slice(0, 10);
        return commit} // retrieve date like YYYY-MM-DD
      ).reduce((acc_commits, commit)=>{
        console.log('reducer', commit);
        let commit_date = commit.commit.committer.date;
        let commit_author = commit.author.login;
        if(acc_commits['commitsTL'][commit_date]){
          acc_commits['commitsTL'][commit_date]++
        }else{
          acc_commits['commitsTL'][commit_date] = 1
        }
        if(acc_commits['commitsPerAuthor'][commit_author]){
          acc_commits['commitsPerAuthor'][commit_author]++
        }else{
          acc_commits['commitsPerAuthor'][commit_author] = 1
        }
        return acc_commits;
    }, {'commitsTL': {}, 'commitsPerAuthor': {}  });

    res.status(200).json(results);
  }).catch((error) => {
      res.status(error.status).json({"message": error.message});
  });
}


module.exports = commits;
