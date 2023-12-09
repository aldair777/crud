<template>
  <navbar></navbar>
  <div class="row mt-5">
    <div class="col-md-6 offset-md-3">
      <div class="card container p-0">
        <div class="card-header bg-dark text-white text-center">
          Editar Contacto
        </div>
        <div class="card-body">
          <form v-on:submit="guardar">
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fas fa-user"></i></span>
              <input
                v-model="nombre"
                type="text"
                id="nombre"
                class="form-control"
                maxlength="50"
                placeholder="Nombre"
                required
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fas fa-user"></i></span>
              <input
                v-model="apellido"
                type="text"
                id="apellido"
                class="form-control"
                maxlength="50"
                placeholder="Apellido"
                required
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"
                ><i class="fas fa-envelope"></i
              ></span>
              <input
                v-model="correo"
                type="email"
                id="correo"
                class="form-control"
                placeholder="Correo"
                required
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fas fa-phone"></i></span>
              <input
                v-model="telefono"
                type="tel"
                id="telefono"
                class="form-control"
                placeholder="Teléfono"
                required
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"
                ><i class="fas fa-mobile-alt"></i
              ></span>
              <input
                v-model="celular"
                type="tel"
                id="celular"
                class="form-control"
                placeholder="Celular"
                required
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"
                ><i class="fas fa-map-marker-alt"></i
              ></span>
              <input
                v-model="direccion"
                type="text"
                id="direccion"
                class="form-control"
                placeholder="Dirección"
                required
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fas fa-globe"></i></span>
              <input
                v-model="pais"
                type="text"
                id="pais"
                class="form-control"
                placeholder="País"
                required
              />
            </div>

            <div class="d-grid col-6 mx-auto">
              <button class="btn btn-success">
                <i class="fa-solid fa-floppy-disk"></i> Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { show_alerta, enviarSolicitud } from "../funciones";
import { useRoute } from "vue-router";
import navbar from "../components/NavBar.vue";

export default {
  components: {
    navbar,
  },
  data() {
    return {
      _id: 0,
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      celular: "",
      direccion: "",
      pais: "",
      url: "http://localhost:3000/api/contacto",
    };
  },
  mounted() {
    const route = useRoute();
    this._id = route.params.id;

    if (this._id) {
      this.url = `${this.url}/${this._id}`;
      this.getContactos();
    } else {
      console.error("El valor de _id es undefined o no válido.");
    }
  },

  methods: {
    getContactos() {
      axios
        .get(this.url)
        .then((response) => {
          this.nombre = response.data["nombre"];
          this.apellido = response.data["apellido"];
          this.correo = response.data["correo"];
          this.telefono = response.data["telefono"];
          this.celular = response.data["celular"];
          this.direccion = response.data["direccion"];
          this.pais = response.data["pais"];
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
        });
    },
    guardar() {
      event.preventDefault();

      // Función para verificar si un valor es válido (no vacío)
      const isValidValue = (value) =>
        value !== undefined && value !== null && value !== "";

      if (!isValidValue(this.nombre)) {
        show_alerta("Escribe el nombre", "warning", "nombre");
      } else if (!isValidValue(this.apellido)) {
        show_alerta("Escribe el apellido", "warning", "apellido");
      } else if (!isValidValue(this.correo)) {
        show_alerta("Escribe el correo", "warning", "correo");
      } else if (!isValidValue(this.telefono)) {
        show_alerta("Escribe el telefono", "warning", "telefono");
      } else if (!isValidValue(this.celular)) {
        show_alerta("Escribe el celular", "warning", "celular");
      } else if (!isValidValue(this.direccion)) {
        show_alerta("Escribe la direccion", "warning", "direccion");
      } else if (!isValidValue(this.pais)) {
        show_alerta("Escribe el pais", "warning", "pais");
      } else {
        var parametros = {
          nombre: this.nombre.trim(),
          apellido: this.apellido.trim(),
          correo: this.correo.trim(),
          telefono: this.telefono,
          celular: this.celular,
          direccion: this.direccion.trim(),
          pais: this.pais.trim(),
        };
        enviarSolicitud("PUT", parametros, this.url, "Contacto guardado");
      }
    },
  },
};
</script>
<style scoped>
.container {
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  overflow: hidden;
}
</style>
