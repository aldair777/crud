<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/contact"
        ><i class="fas fa-address-card"></i> Contactos</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" href="/contact"
              ><i class="fas fa-address-card"></i> Mostrar</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/create"
              ><i class="fas fa-user-plus"></i> Crear</a
            >
          </li>
        </ul>
      </div>
      <div class="ms-auto">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" style="cursor: pointer;" @click="cerrarSesion"
              ><i class="fas fa-door-open"></i> Cerrar sesión</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Swal from 'sweetalert2';
import { ref } from "vue"; 
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
export default {
  created() {
    // Recuperar el token almacenado en localStorage al cargar la página
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      // Establecer el token en los encabezados de Axios si está presente
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

    } else {
      // Muestra una alerta SweetAlert si el token no está presente
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, inicia sesión para acceder.",
      });

      // Espera 5 segundos y luego redirige a la página de inicio de sesión
      this.$router.push("/");
    }
  },
  setup() {
    const router = useRouter();

    const cerrarSesion = () => {
      // Eliminar el token del localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("id");

      // Limpiar los encabezados de Axios
      delete axios.defaults.headers.common["Authorization"];

      // Redirigir a la página de inicio de sesión u otra página
      router.push("/");
    };

    return {
      cerrarSesion,
    };
  },
  name: "navbar",
};
</script>

<style scoped></style>
