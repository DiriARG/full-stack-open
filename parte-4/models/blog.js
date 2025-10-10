// Archivo donde se define el esquema y el modelo Mongoose para los documentos "Blog".
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

// Transforma la salida de MongoDB antes de convertir a JSON.
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // Renombra el campo "_id" a "id" y lo convierte a String.
    returnedObject.id = returnedObject._id.toString(); 
    // Elimina los campos "_id" original y "__v".
    delete returnedObject._id;
    delete returnedObject.__v; 
  },
});

module.exports = mongoose.model("Blog", blogSchema);
