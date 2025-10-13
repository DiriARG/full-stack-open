const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
});

usuarioSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // el "passwordHash" no debe mostrarse.
    delete returnedObject.passwordHash;
  },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
