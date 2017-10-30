"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
var Express = require("express");
var app = Express();
Mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    var KittySchema = new Mongoose.Schema({
        name: String
    });
    var Kitten = Mongoose.model("Kitten", KittySchema);
    var silence = new Kitten({ name: "Silence" });
    console.log(silence.name);
});
