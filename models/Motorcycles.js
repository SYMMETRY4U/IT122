import mongoose from 'mongoose';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
import {connectionString} from '../models/credentials.js';
mongoose.connect(connectionString, {
    dbName: 'itprojects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const motorcycleSchema = new Schema({
 title: { type: String, required: true },
 brand: String,
 model: String,
 year: Number,
 color: String
});

export const Motorcycle = mongoose.model('Motorcycle', motorcycleSchema);