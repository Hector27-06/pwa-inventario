// REGISTRO DEL SW
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(() => console.log("SW: Activo"));
}

const statusElement = document.getElementById("status");

async function updateOnlineStatus() {
  let online = navigator.onLine;

  if (online) {
    try {
      // Intentamos conectar a un servidor externo que NO está en el SW
      // Usamos 'no-cors' para evitar errores de seguridad, solo nos importa si llega o no
      await fetch("https://www.google.com/favicon.ico", {
        mode: "no-cors",
        cache: "no-store",
      });
      online = true;
    } catch (e) {
      // Si falla la conexión a Google, estamos offline
      online = false;
    }
  }

  if (online) {
    statusElement.textContent = "CONECTADO";
    statusElement.style.backgroundColor = "#27ae60";
  } else {
    statusElement.textContent = "MODO OFFLINE";
    statusElement.style.backgroundColor = "#c0392b";
  }
}

setInterval(updateOnlineStatus, 2000);
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);
updateOnlineStatus();

// FORMULARIO E INDEXEDDB
const form = document.getElementById("product-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const cantidad = document.getElementById("cantidad").value;
  if (nombre && cantidad) {
    guardarProducto(nombre, cantidad);
    form.reset();
  }
});
