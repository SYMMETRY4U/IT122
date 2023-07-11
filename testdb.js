import { Motorcycle } from "./models/Motorcycles.js";
// return all records
Motorcycle.find({}).lean()
  .then((books) => {
    console.log(books);
  })
  .catch(err => console.log(err));
  