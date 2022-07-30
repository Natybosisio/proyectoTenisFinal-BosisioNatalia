const contenidoDOM = document.querySelector("#profes")

const URL = "JS/profesores.json"

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {

    obtenerContenido(URL)
  }, 1000);
})

const retornarContenido = (contenido) => {
  const { profesor, img, descripcion, horario } = contenido
  return `
<div class="card align-items-center texto">
<h5>"${profesor}"</h5>
  <img class="card-img-top align-items-center" src="${img}" alt="Card image profe">
  <div class="card-body">
    <p class="card-text">${descripcion}</p>
    <p><strong>"${horario}"</strong></p>
  </div>
</div>
<br>`


}


const retornoCardError = () => {
  return `<div class="center white-text"> 
               
                <h4>El contenido parece no estar disponible. Intente nuevamente en unos minutos.</h4> 
                
            </div>`
}

const obtenerContenido = (URL) => {
  let cardsAmostrar = ""
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      for (contenido of data)
        cardsAmostrar += retornarContenido(contenido)
      contenidoDOM.innerHTML = cardsAmostrar
    })
    .catch((error) => contenidoDOM.innerHTML = retornoCardError())

}

