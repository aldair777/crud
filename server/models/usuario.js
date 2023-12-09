const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const usuarioSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  nombre: String,
  avatar: String,
  password: {
    type: String,
    select: false,
  },
  singupDate: {
    type: Date,
    default: Date.now(),
  },
  lastLogin: Date,
});

usuarioSchema.pre("save", function (next) {
  let user = this;
  if (!user.isModified("password")) return next();

  // Asegúrate de que el campo 'password' tenga un valor
  if (!user.password) {
    return next(new Error("La contraseña es obligatoria."));
  }

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    console.log("Contraseña antes de hash:", user.password);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
  
      user.password = hash;
      console.log("Contraseña después de hash:", user.password);
      next();
    });
  });
});

usuarioSchema.methods.gravatar = function () {
  if (!this.email) return `https://www.gravatar.com/avatar/?s=200&d=retro`;

  const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
};

module.exports = mongoose.model("Usuario", usuarioSchema);
