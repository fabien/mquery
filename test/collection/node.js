
var assert = require('assert');
var mongo = require('mongodb');

var uri = process.env.MQUERY_URI || 'mongodb://localhost:27017/mquery';
var client;
var db;

exports.getCollection = function(cb) {
  mongo.MongoClient.connect(uri, { useNewUrlParser: true }, function(err, _client) {
    assert.ifError(err);
    client = _client;
    db = client.db();

    var collection = db.collection('stuff');

    // clean test db before starting
    db.dropDatabase(function() {
      cb(null, collection);
    });
  });
};

exports.dropCollection = function(cb) {
  db.dropDatabase(function() {
    client.close(cb);
  });
};
