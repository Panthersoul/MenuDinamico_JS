
let arc = [];

let articulos = document.querySelectorAll(".carrito");


const agregoCarrito = ( {target} ) => {
    let carrito = [];
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

const limpiarCarritoHTML = () => {
    let modalCuerpo = document.getElementById("modal-cuerpo");
    let modalTotal = document.getElementById("modal-total");
    if (modalCuerpo.hasChildNodes()){
        modalCuerpo.removeChild(modalCuerpo.firstChild);
    }
    if (modalTotal.hasChildNodes())
    {
        modalTotal.removeChild(modalTotal.firstChild);
    }
    
}

cargarCarrito = () => {
    limpiarCarritoHTML();

    let listado = JSON.parse(localStorage.getItem("carrito"));
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
    listado = null;

}

function calcularTotal (...monto){
    return monto.reduce((acc, num) => acc + num, 0);
}

verCarro.addEventListener("click", ()=>{
    cargarCarrito();   
})

let btnPedido = document.getElementById("enviarComanda");
let cerrarModal = document.getElementById("cerrarModal");
let btnCarrito = document.getElementById("carrito");
let modalCuerpo = document.getElementById("modal-cuerpo");
let modalTotal = document.getElementById("modal-total");


const enviarComanda = () => {
    const articulos = JSON.parse(localStorage.getItem("carrito"));
    
    fetch('https://jsonplaceholder.typicode.com/posts',
    {
        method: 'POST',
        body: JSON.stringify({
            articulos
        }),
        headers: {
            'Content-type':'application/json;charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then((data) => {
        
        btnCarrito.classList.add("d-none");
        Swal.fire( {title: "Hemos enviado la comanda... <br> la puedes ver en consola.", imageUrl: '../images/pizza.jpg', imageAlt: 'ImagenAlerta'})
        localStorage.removeItem("carrito");
        limpiarCarritoHTML();
        cerrarModal.click();
        console.log(data);
    })
    .catch((error) => {
        Swal.fire( {title: error, imageUrl: '../images/error.jpg', imageAlt: 'ImagenError'})
    })
}


btnPedido.onclick = enviarComanda;


