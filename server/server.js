const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const contactoRoutes = require('./routes/contactoRoutes');
const axios = require('axios')
const cors = require('cors')

const app = express();
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use(cors({
  origin: 'http://localhost:5173',  // Ajusta el origen permitido
  credentials: true,
})); 

// Middleware para el manejo de JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/api', contactoRoutes);

// Conexión a la base de datos
const url = 'mongodb://localhost:27017/contact';  // Ajusta la URL de tu base de datos
mongoose.connect(url)
  .then(() => {
    console.log('Conectado a MongoDB');
    // Inicia el servidor después de conectar a la base de datos
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });