'use strict';

const setCors = (req, res, next) => {
  try {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  } catch (error){
    res.status(400).send(error.message);
  }
};

module.exports = setCors;
