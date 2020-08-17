var mongoose = require('mongoose')
// import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/webapp', { useNewUrlParser: true },err => {
    if(err) console.log('connect to mongodb error');
    else console.log('connect to mongodb success');
});

module.exports = mongoose



