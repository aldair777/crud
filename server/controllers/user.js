const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");
const Service = require("../services");

function signUp(req, res) {
  const user = new Usuario({
    email: req.body.email,
    nombre: req.body.nombre,
    password: req.body.password,
  });

  console.log("User Data:", user);

  user
    .save()
    .then(() => {
      res.status(200).send({
        token: Service.createToken(user),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error al crear el usuario: ${err}`,
      });
    });
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Correo y contraseña son obligatorios" });
    }

    const user = await Usuario.findOne({ email: email }).select("+password");

    console.log("Usuario de la base de datos:", user);
    console.log("Contraseña proporcionada:", password);

    if (!user) {
      return res.status(404).send({ message: "No existe el usuario" });
    }

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Tipo de dato de la contraseña:", typeof password);
      console.log("Tipo de dato de la contraseña:", typeof password);
      console.log("Contraseña proporcionada:", password);

      if (!isPasswordValid) {
        return res.status(401).send({ message: "Contraseña incorrecta" });
      }

      res.status(200).send({
        message: "Te has logueado correctamente",
        token: Service.createToken(user),
      });
    } catch (compareError) {
      console.error("Error al comparar contraseñas:", compareError);
      res.status(500).send({
        message: "Error al iniciar sesión",
        error: "Contraseña inválida",
      });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "Error al iniciar sesión", error: err.message });
  }
}


const getUserId = (req, res) => {
  try {
    // Asegúrate de que req.user y req.user.id estén presentes
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'No se pudo obtener el ID del usuario autenticado' });
    }

    // Devolver el ID del usuario en la respuesta
    res.status(200).json({ id: req.user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = getUserId;

module.exports = {
  signUp,
  signIn,
  getUserId,
};
