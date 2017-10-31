import * as Mongoose from "mongoose";
import * as Express from "express";
import * as BlueBird from "bluebird";

let app = Express();
(<any>Mongoose).Promise = BlueBird;
Mongoose.connect('mongodb://LittleLeah:Fellini_2003@logdb-shard-00-00-pyaxd.mongodb.net:27017,logdb-shard-00-01-pyaxd.mongodb.net:27017,logdb-shard-00-02-pyaxd.mongodb.net:27017/test?ssl=true&replicaSet=LogDb-shard-0&authSource=admin', {useMongoClient: true});

let db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
let Log_Schema = new Mongoose.Schema({
    action : String,
    time : Date
});
let date = new Date();
let Logs = Mongoose.model("Log", Log_Schema);
let log = new Logs({ action: "User logged in", time: date});
log.save(function (err) {
if (err) return console.log(err);
})
console.log(log.action);
date = new Date();
log = new Logs({ action: "User added an transaction", time: date})
log.save(function (err) {
    if (err) return console.log(err);
    })
console.log(log.time);

Logs.find({}, function (err, result){
    if (err) console.log(err);
    console.log(result);
});
});
