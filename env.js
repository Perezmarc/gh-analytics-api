
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const GH_API_URL = 'https://api.github.com';
const AUTH_PARAMS = `client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

module.exports = {
    CLIENT_ID: CLIENT_ID,
    CLIENT_SECRET: CLIENT_SECRET,
    GH_API_URL: GH_API_URL,
    AUTH_PARAMS: AUTH_PARAMS
};
