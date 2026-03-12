let db;
const request = indexedDB.open("InventarioDB", 1);

request.onupgradeneeded = (event) => {
  db = event.target.result;
  if (!db.objectStoreNames.contains("productos")) {
    db.createObjectStore("productos", { keyPath: "id", autoIncrement: true });
  }
};

request.onsuccess = (event) => {
  db = event.target.result;
  mostrarProductos();
};

function guardarProducto(nombre, cantidad) {
  const transaction = db.transaction(["productos"], "readwrite");
  const store = transaction.objectStore("productos");

  store.add({ nombre, cantidad: parseInt(cantidad) }).onsuccess = () => {
    mostrarProductos();
  };
}

function mostrarProductos() {
  const lista = document.getElementById("lista-productos");
  if (!lista) return;
  lista.innerHTML = "";

  const transaction = db.transaction(["productos"], "readonly");
  const store = transaction.objectStore("productos");

  store.openCursor().onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      const li = document.createElement("li");
      li.style.cssText =
        "background:white; margin:10px; padding:10px; border-radius:5px; list-style:none; display:flex; justify-content:space-between; box-shadow: 0 2px 4px rgba(0,0,0,0.1);";
      li.innerHTML = `<span><strong>${cursor.value.nombre}</strong></span> <span>Cant: ${cursor.value.cantidad}</span>`;
      lista.appendChild(li);
      cursor.continue();
    }
  };
}
