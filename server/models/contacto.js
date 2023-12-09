const mongoose = require('mongoose')

const contactSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "porfavor introduzca el nombre"]
        },
        apellido: {
            type: String,
            required: [true, "porfavor introduzca el apellido"]
        },
        correo: {
            type: String,
            required: [true, "porfavor introduzca el correo"]
        },
        telefono: {
            type: Number,
            required: [true, "porfavor introduzca el telefono"]
        },
        celular: {
            type: Number,
            required: [true, "porfavor introduzca el celular"]
        },
        direccion: {
            type: String,
            required: [true, "porfavor introduzca la direccion"]
        },
        pais: {
            type: String,
            required: [true, "porfavor introduzca el pais"]
        },
        foto: {
            type: String,
            required: false
        },
        usuario: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    },
    {
        timestamp: true
    }
)

const contacto = mongoose.model('contacto', contactSchema);

module.exports = contacto;