const Contacto = require("../models/contacto");
const Usuario = require("../models/usuario");

exports.getContactosByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const contactos = await Contacto.find({ usuario: userId });

    if (contactos.length === 0) {
      return res.status(404).json({ message: `No se encontraron contactos para el usuario con el ID ${userId}` });
    }

    res.status(200).json(contactos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getContactoById = async (req, res) => {
  try {
    const { id } = req.params;
    const contacto = await Contacto.findById(id);

    if (!contacto) {
      return res
        .status(404)
        .json({ message: `No se encontró ningún contacto con el ID ${id}` });
    }

    res.status(200).json(contacto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createContacto = async (req, res) => {
  try {
    // Verificar si se proporciona el ID del usuario en el cuerpo de la solicitud
    const userId = req.body.usuario;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "Debe proporcionar un ID de usuario válido" });
    }

    // Crear un nuevo contacto asociado al usuario
    const nuevoContacto = await Contacto.create({
      ...req.body,
      usuario: userId,
    });

    // Devolver una respuesta exitosa
    res.status(200).json({
      message: "exitosamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateContacto = async (req, res) => {
  try {
    const { id } = req.params;
    const contacto = await Contacto.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!contacto) {
      return res
        .status(404)
        .json({ message: `No puedo encontrar ningún contacto con ID ${id} ` });
    }

    res.status(200).json({
      message: "exitosamente",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteContacto = async (req, res) => {
  try {
    const { id } = req.params;
    const contacto = await Contacto.findByIdAndDelete(id);

    if (!contacto) {
      return res
        .status(404)
        .json({ message: `No se encontró ningún contacto con el ID ${id}` });
    }

    res.status(200).json({
      message: `Contacto con ID ${id} eliminado exitosamente`,
      deletedContact: contacto,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
