import * as Mongoose from "mongoose";
import * as Express from "express";

let app = Express();

Mongoose.connect('mongodb://localhost/test', {useMongoClient: true});

let db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
let KittySchema = new Mongoose.Schema({
    name : String
});

let Kitten = Mongoose.model("Kitten", KittySchema);
let silence = new Kitten({ name: "Silence"});
console.log(silence.name);
});