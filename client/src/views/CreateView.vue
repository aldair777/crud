<template>
  <navbar></navbar>
  <div class="row mt-5">
    <div class="col-md-6 offset-md-3">
      <div class="card container">
        <div class="card-header bg-dark text-white text-center">
          Guardar contacto
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
import { show_alerta, enviarSolicitud } from "../funciones";
import navbar from "../components/NavBar.vue";

export default {
  components: {
    navbar,
  },
  data() {
    return {
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      celular: "",
      direccion: "",
      pais: "",
      url: "http://localhost:3000/api/contacto",
      userId: "", // Asegúrate de obtener el ID del almacenamiento local
    };
  },
  mounted() {
    // Obtén el ID del almacenamiento local
    this.userId = localStorage.getItem("id");
    console.log(this.userId)
  },
  methods: {
    guardar() {
      event.preventDefault();
      if (this.nombre.trim() === "") {
        show_alerta("Escribe el nombre", "warning", "nombre");
      } else if (this.apellido.trim() === "") {
        show_alerta("Escribe el apellido", "warning", "apellido");
      } else if (this.correo.trim() === "") {
        show_alerta("Escribe el correo", "warning", "correo");
      } else if (this.telefono.trim() === "") {
        show_alerta("Escribe el telefono", "warning", "telefono");
      } else if (this.celular.trim() === "") {
        show_alerta("Escribe el celular", "warning", "celular");
      } else if (this.direccion.trim() === "") {
        show_alerta("Escribe la direccion", "warning", "direccion");
      } else if (this.pais.trim() === "") {
        show_alerta("Escribe el pais", "warning", "pais");
      } else {
        // Modifica el objeto para incluir el ID en el cuerpo de la solicitud
        var parametros = {
          usuario: this.userId,
          nombre: this.nombre.trim(),
          apellido: this.apellido.trim(),
          correo: this.correo.trim(),
          telefono: this.telefono.trim(),
          celular: this.celular.trim(),
          direccion: this.direccion.trim(),
          pais: this.pais.trim(),
        };
        enviarSolicitud("POST", parametros, this.url, "Contacto guardado");
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
  padding: 0;
}
</style>
