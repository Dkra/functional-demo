'use strict';

const util        = require('util');
const mongodb     = require("mongodb");
const MongoClient = require('mongodb').MongoClient;
const log         = require('debug')('users:mongodb-model');
const error       = require('debug')('users:error');
const Note        = require('./Note');

var db;

exports.connectDB = function() {
    return new Promise((resolve, reject) => {
        if (db) return resolve(db);
        // Connection URL
        var url = process.env.MONGO_URL;
        console.log('url', url);
        // Use connect method to connect to the Server
        MongoClient.connect(url, (err, _db) => {
            if (err) return reject(err);
            console.log('db', db);
            db = _db;
            resolve(_db);
        });
    });
};

exports.findOrCreate = function() {
  var collection = db.collection('users');
  return exports.connectDB()
    .then(db => {
      return collection.findOne({ username: profile.id})
    })
    // .then(user => {
    //   if (user) return users
    //   return collection.insertOne({
    //       notekey: key, title: title, body: body
    //   }).then(result => { return note; });
    // })
}
