<template>
  <div class="home">
    <div :class="{ active: containerActive }" class="container" id="container">
      <div class="form-container sign-up">
        <form @submit.prevent="submitSignUp">
          <h1>Crear Cuenta</h1>
          <input
            v-model="nombre"
            type="text"
            name="nombre"
            placeholder="Nombre"
          />
          <input
            v-model="correo"
            type="email"
            name="correo"
            placeholder="Correo"
          />
          <input
            v-model="contraseña"
            type="password"
            name="contraseña"
            placeholder="Contraseña"
          />
          <button>Registrarse</button>
        </form>
      </div>
      <div class="form-container sign-in">
        <form @submit.prevent="submitSignIn">
          <h1 class="mb-4">Iniciar Sesión</h1>
          <input v-model="correoInicio" type="email" placeholder="Correo" />
          <input
            v-model="contraseñaInicio"
            type="password"
            placeholder="Contraseña"
          />
          <button class="mt-4">Iniciar Sesión</button>
        </form>
      </div>
      <div class="toggle-container">
        <div class="toggle">
          <div class="toggle-panel toggle-left">
            <h1>Hola, Amigo!</h1>
            <p>
              Regístrese con sus datos personales para utilizar todas las
              funciones del sitio.
            </p>
            <button @click="activateContainer('login')">Iniciar Sesión</button>
          </div>
          <div class="toggle-panel toggle-right">
            <h1>Hola, Amigo!</h1>
            <p>
              Ingrese sus datos personales para utilizar todas las funciones del
              sitio.
            </p>
            <button @click="activateContainer('register')">Registrarse</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeUnmount } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const nombre = ref("");
    const correo = ref("");
    const contraseña = ref("");

    const correoInicio = ref("");
    const contraseñaInicio = ref("");

    const submitSignUp = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/signup", {
          nombre: nombre.value,
          email: correo.value,
          password: contraseña.value,
        });
        nombre.value = "";
        correo.value = "";
        contraseña.value = "";
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        localStorage.setItem("token", response.data.token);
        // Manejar la respuesta si es necesario
      } catch (error) {
        console.error("Error al enviar el formulario de registro:", error);
        // Puedes manejar el error según tus necesidades
      }
    };

    const submitSignIn = async () => {
      try {
        // Realiza la solicitud de inicio de sesión
        const responseSignIn = await axios.post(
          "http://localhost:3000/api/signin",
          {
            email: correoInicio.value,
            password: contraseñaInicio.value,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        contraseñaInicio.value = "";
        correoInicio.value = "";
        // Almacena el token en el almacenamiento local
        localStorage.setItem("token", responseSignIn.data.token);

        // Configura el token en los encabezados por defecto de axios
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${responseSignIn.data.token}`;

        // Realiza la solicitud para obtener el ID del usuario con el token de autorización
        const responseUser = await axios.get("http://localhost:3000/api/user", {
          headers: {
            Authorization: `Bearer ${responseSignIn.data.token}`,
          },
        });

        localStorage.setItem("id", responseUser.data.id);

        // Redirecciona a la página de contactos
        await router.push("/contact");
      } catch (error) {
        console.error(
          "Error al enviar el formulario de inicio de sesión:",
          error
        );
        // Puedes manejar el error según tus necesidades
      }
    };

    onBeforeUnmount(() => {
      document.body.classList.remove("home-body");
    });

    return {
      nombre,
      correo,
      contraseña,
      correoInicio,
      contraseñaInicio,
      submitSignUp,
      submitSignIn,
    };
  },
  created() {
    document.body.classList.add("home-body");
  },
  delete() {
    document.body.classList.remove("home-body");
  },
  data() {
    return {
      containerActive: false,
    };
  },

  methods: {
    activateContainer(btnType) {
      if (btnType === "register") {
        this.containerActive = true;
      }
      if (btnType === "login") {
        this.containerActive = false;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,800;1,700&display=swap");

h1 {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
}
.home * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

.container {
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}
.container p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin: 20px 0;
}
.container span {
  font-size: 12px;
}
.container a {
  color: #333;
  font-size: 13px;
  text-decoration: none;
  margin: 15px 0 10px;
}
.container button {
  background-color: #512da8;
  color: #fff;
  font-size: 12px;
  padding: 10px 45px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
}
.container button.hidden {
  background-color: transparent;
  border-color: #fff;
}
.container form {
  font-family: "Montserrat", sans-serif;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
}
.container input {
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  width: 100%;
  outline: none;
}
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}
.sign-in {
  left: 0;
  width: 50%;
  z-index: 2;
}
.container.active .sign-in {
  transform: translateX(100%);
}
.sign-up {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}
.container.active .sign-up {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: move o.6s;
}
@keyframes move {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
.toggle-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 0 0 100px;
  z-index: 1000;
}
.container.active .toggle-container {
  transform: translateX(-100%);
  border-radius: 0 150px 100px 0;
}
.toggle {
  background-color: #512da8;
  height: 100%;
  background: linear-gradient(to right, #5c6bc0, #512da8);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: all 0.6ss ease-in-out;
}
.container.active .toggle {
  transform: translateX(50%);
}
.toggle-panel {
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}
.toggle-left {
  transform: translateX(-200%);
}
.container.active .toggle-left {
  transform: translateX(0);
}
.toggle-right {
  right: 0;
  transform: translateX(0);
}
.container.active .toggle-right {
  transform: translateX(200%);
}
</style>
