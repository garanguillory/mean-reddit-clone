var config = {};

config.mongoURI = {
  test: 'mongodb://localhost/mean-reddit-clone-test',
  development: 'mongodb://localhost/mean-reddit-clone',
  production: process.env.MONGODB_URI
};


module.exports = config;
