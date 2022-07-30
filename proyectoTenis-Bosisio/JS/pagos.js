
function cajaReservas() {

  if (horasHabilitadas.value < 18) {
    let precio = 1200
    console.log("INGRESAN A CAJA" + " " + precio)
  } else {
    let precio = 1500
    console.log("INGRESAN A CAJA" + " " + precio)
  }
}

function calcularPrecio() {
  if (hora < 18) {
    precio = 1200


  } else {
    precio = 1500

  } return precio
}
