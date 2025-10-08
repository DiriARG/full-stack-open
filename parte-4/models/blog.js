// Archivo donde se define el esquema y el modelo Mongoose para los documentos "Blog".
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

// Sirve para eliminar el campo "__v" al momento de mostrarlo.
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
