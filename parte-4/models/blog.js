// Archivo donde se define el esquema y el modelo Mongoose para los documentos "Blog".
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    // En caso de que la propiedad "likes" falte en la solicitud, tendrá el valor 0 por defecto.
    default: 0,
  },
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
