import Swal from "sweetalert2";
import axios from "axios";

export function show_alerta(mensaje, icono, foco = "") {
  if (foco !== "") {
    document.getElementById(foco).focus();
  }
  Swal.fire({
    title: mensaje,
    icon: icono,
    customClass: { confirmButton: "btn btn-primary", popup: "animated zoomIn" },
    buttonsStyling: false,
  });
}

export function confirmar(_id, name) {
  var url = "http://localhost:3000/api/contacto/" + _id;
  const swalWithBoostrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success me-3",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBoostrapButtons
    .fire({
      title: "¿Seguro que quieres eliminar el contacto " + name + "?",
      text: "Se perderá la información del contacto",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: '<i class="fa-solid fa-check"></i> Sí, eliminar',
      cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        // Pasar el ID directamente, no como propiedad 'id' dentro de un objeto
        enviarSolicitud("DELETE", _id, url, "Contacto eliminado");
      } else {
        show_alerta("Operación cancelada", "info");
      }
    });
}

export function enviarSolicitud(metodo, parametros, url, mensaje) {
  return new Promise((resolve, reject) => {
    axios({ method: metodo, url: url, data: parametros })
      .then(function (respuesta) {
        console.log("Respuesta del servidor:", respuesta);

        var message = respuesta.data.message || ""; // Usar un valor predeterminado si message no está definido
        console.log("Mensaje:", message);

        if (message.includes("exitosamente")) {
          show_alerta(mensaje, "success");
          // Recargar la página después de 1 segundo
          window.setTimeout(function () {
            window.location.reload();
          }, 1000);

          resolve(message); // Resuelve la promesa con el mensaje
        } else {
          var listado = obtenerListadoErrores(respuesta);
          show_alerta(listado, "error");
          reject(listado); // Rechaza la promesa con el listado de errores
        }
      })
      .catch(function (error) {
        show_alerta("Error en la solicitud", "error");
        reject("Error en la solicitud"); // Rechaza la promesa con un mensaje de error genérico
      });
  });
}