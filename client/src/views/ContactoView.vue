<template>
  <navabar></navabar>
  <div class="row mt-5">
    <div class="col-lg-8 offset-lg-2">
      <div class="table-responsive container">
        <table class="table table-bordered table-hover m-0">
          <thead class="table table-dark">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Celular</th>
              <th>Direccion</th>
              <th>Pais</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">
            <tr v-for="cont in contactos" :key="cont._id">
              <td>{{ cont.nombre }}</td>
              <td>{{ cont.apellido }}</td>
              <td>{{ cont.correo }}</td>
              <td>{{ cont.telefono }}</td>
              <td>{{ cont.celular }}</td>
              <td>{{ cont.direccion }}</td>
              <td>{{ cont.pais }}</td>
              <td>
                <router-link
                  v-if="cont._id"
                  :to="{ path: 'edit/' + cont._id }"
                  class="btn btn-warning"
                >
                  <i class="fas fa-pencil-alt"></i> </router-link
                >&nbsp;
                <button
                  class="btn btn-danger"
                  v-on:click="eliminar(cont._id, cont.nombre)"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { confirmar } from "../funciones";
import navabar from "../components/NavBar.vue";

export default {
  components: {
    navabar,
  },
  data() {
    return {
      contactos: null,
      userId: null, // Agrega la propiedad userId al objeto data
    };
  },
  mounted() {
    this.getUserIdFromLocalStorage(); // Llama a la función para obtener el userId
    this.getContactos(); // Llama a la función para obtener los contactos
  },
  methods: {
    getUserIdFromLocalStorage() {
      // Obtiene el userId del localStorage
      this.userId = localStorage.getItem("id");
      console.log(this.userId);
    },
    getContactos() {
      axios
        .get(`http://localhost:3000/api/contactos/${this.userId}`)
        .then((response) => {
          this.contactos = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener contactos:", error);
          Swal.fire({
            icon: "info",
            title: "Sin contactos",
            text: "No tienes ningún contacto agregado.",
          });
        });
    },
    eliminar(_id, nombre) {
      confirmar(_id, nombre);
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
