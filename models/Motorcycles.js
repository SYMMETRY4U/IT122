import mongoose from 'mongoose';
const { Schema } = mongoose;

// For security, connectionString should be in a separate file and excluded from git
const connectionString = "mongodb+srv://dbuser:2679School@cluster0.hcfrcic.mongodb.net/?retryWrites=true&w=majority";

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