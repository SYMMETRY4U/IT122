import mongoose from 'mongoose';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
import {connectionString} from '../models/credentials.js';



mongoose.connect(connectionString, {
  dbName: 'itprojects',
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Mongoose connected.');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define data model as JSON key/value pairs
// values indicate the data type of each key
const motorcycleSchema = new Schema({
 brand: { type: String, required: true },
 model: String,
 year: Number,
 color: String
});

//export const Motorcycle = mongoose.model('Motorcycles', motorcycleSchema);

export default mongoose.model('Motorcycle', motorcycleSchema);
