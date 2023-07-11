if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
    .then(response => console.log("Se instalo correctamente - ", response))
    .catch(error => console.log("Fallo la instalacion - ", error))
} else {
  console.log("no soporta service worker")
}