"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mongoose = require("mongoose");
exports.Logs = new Mongoose.Collection("Log", Mongoose.connection);
