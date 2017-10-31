import * as Mongoose from "mongoose";
import * as BlueBird from "bluebird";



export const Logs = new Mongoose.Collection("Log", Mongoose.connection);