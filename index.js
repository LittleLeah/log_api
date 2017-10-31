"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var Express = require("express");
var BlueBird = require("bluebird");
var BodyParser = require("body-parser");
var app = Express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
Mongoose.Promise = BlueBird;
var db = Mongoose.connection;
var MongoClient = require('mongodb').MongoClient;
var url = "'mongodb://LittleLeah:Fellini_2003@logdb-shard-00-00-pyaxd.mongodb.net:27017,logdb-shard-00-01-pyaxd.mongodb.net:27017,logdb-shard-00-02-pyaxd.mongodb.net:27017/test?ssl=true&replicaSet=LogDb-shard-0&authSource=admin";
app.post("/", function (req, resp) {
    var action = req.body.action;
    Mongoose.connect('mongodb://LittleLeah:Fellini_2003@logdb-shard-00-00-pyaxd.mongodb.net:27017,logdb-shard-00-01-pyaxd.mongodb.net:27017,logdb-shard-00-02-pyaxd.mongodb.net:27017/test?ssl=true&replicaSet=LogDb-shard-0&authSource=admin', { useMongoClient: true });
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        var Log_Schema = new Mongoose.Schema({
            action: String,
            time: Date
        });
        var date = new Date();
        var Logs = Mongoose.model("Log", Log_Schema);
        var log = new Logs({ action: action, time: date });
        log.save(function (err) {
            if (err)
                return console.log(err);
        });
    });
    db.close();
});
app.get("/dbcontent", function (req, resp) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://LittleLeah:Fellini_2003@logdb-shard-00-00-pyaxd.mongodb.net:27017,logdb-shard-00-01-pyaxd.mongodb.net:27017,logdb-shard-00-02-pyaxd.mongodb.net:27017/test?ssl=true&replicaSet=LogDb-shard-0&authSource=admin";
    MongoClient.connect(url, function (err, db) {
        if (err)
            throw err;
        db.collection("logs").find({}, function (err, result) {
            if (err)
                throw err;
            console.log(result);
            db.close();
        });
    });
});
console.log("Server listening on port 3000");
app.listen(3000);
