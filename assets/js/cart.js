
let arc = [];

let articulos = document.querySelectorAll(".carrito");

const carrito = [];
const agregoCarrito = ( {target} ) => {
    
    let NombreProdCarrito = target.querySelector(".nomElemCarr");
    let PrecioProdCarrito = target.querySelector(".precioElemCarr");
    
    let nuevoProdNom = document.createElement("p");
    nuevoProdNom.className = "carritoNombre";
    nuevoProdNom.innerHTML = NombreProdCarrito.innerHTML;
    
    let nuevoProdPrecio = document.createElement("p");
    nuevoProdPrecio.className = "carritoPrecio";
    nuevoProdPrecio.innerHTML = PrecioProdCarrito.innerHTML;

    
    let productoCarro = {
        nombre: nuevoProdNom.innerHTML,
        precio: nuevoProdPrecio.innerHTML.substring(1,nuevoProdPrecio.innerHTML.length).trim()
    }
    
    if (localStorage.getItem("carrito") == null){
        carrito.push(productoCarro);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }else{
        const listado = JSON.parse(localStorage.getItem("carrito"));
        listado.push(productoCarro);
        localStorage.setItem("carrito", JSON.stringify(listado));
    }
    if (carrito.length != null){
        let carrin = document.querySelector(".carrito");
        carrin.classList.remove("d-none");
    }
}

/* Agrego al boton "VER CARRITO" los eventos que muestran cargan y eleminan*/
let verCarro = document.getElementById("carrito");

const quitarCarrito = ( {target} ) => {
    let listado = JSON.parse(localStorage.getItem("carrito"));
    let indice = listado.findIndex(elem => {
        return elem.nombre === target.firstChild.innerText
    });
    listado.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(listado));
    cargarCarrito();
}

cargarCarrito = () => {
    let modalCuerpo = document.getElementById("modal-cuerpo");
    let modalTotal = document.getElementById("modal-total");
    modalCuerpo.removeChild(modalCuerpo.firstChild);
    modalTotal.removeChild(modalTotal.firstChild);
    const listado = JSON.parse(localStorage.getItem("carrito"));
    let ul = document.createElement("ul");
    let total = 0;
    let monto = [];

    listado.forEach( elem => { 
        let li = document.createElement("li");
        total = total + parseInt(elem.precio);
        monto.push(parseInt(elem.precio));
        li.innerHTML = `<p class="nomElemCarr">${elem.nombre}</p><p class="precioElemCarr">$ ${elem.precio}</p>`;
        li.className = "articuloCarro";
        ul.appendChild(li);
    })

    let sumatoria = calcularTotal(...monto);
    let suma = document.createElement("h4");
    suma.className = "totalCarro";
    suma.innerHTML = `El total del pedido es $<span class="verde margenIZ">${sumatoria}</span>`;
    suma.classList.add("p-3");

    modalTotal.appendChild(suma);
    modalCuerpo.appendChild(ul);

    let artiCarrito = document.getElementsByClassName("articuloCarro");
    for (art of artiCarrito){
        art.addEventListener("click", quitarCarrito)
    }

}

function calcularTotal (...monto){
    return monto.reduce((acc, num) => acc + num, 0);
}

verCarro.addEventListener("click", ()=>{
    cargarCarrito();   
})

