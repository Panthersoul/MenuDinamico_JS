/*  La idea es crear un menú dinámico para restaurant agregando categorias y a esas categorias 
    platos con su respectivo precio. 
    Y luego realizar las comandas*/

//El producto esta asociado a una categoria
class producto {
    constructor (categoria, nombre, precio){
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = precio;
    }

    iva(){
        return this.precio * 1.22;
    }

}

class categoria {
    constructor (nombre, numero){
        this.nombre = nombre;
        this.numero = numero;
    }
}

/*Genero ambas listas*/ 
let listaCategoria = [];
let listaProductos = [];


// AQUI AGREGO CATEGORIAS
let menu = document.getElementById("menu");
let boton = document.getElementById("submitCategoria");
let inputCategoria = document.getElementById("inputCategoria");
let botonListo = document.querySelector("#listoCategoria");
let seleccionCategoria = document.getElementById("selectCategoria");
let divAgregoCat = document.getElementById("agregoCategoria");
let divAgregoProd = document.getElementById("agregoProductos");


/*Escondo Menu*/
menu.style.opacity = 0;
divAgregoProd.style.display = "none";

let listaNombreCat = [];
const agregoCategoria = (e) => {
    let valorCategoria = inputCategoria.value.toUpperCase() 
    listaNombreCat.push(valorCategoria);
    let li = document.createElement("li");
    li.innerHTML = `
        ${valorCategoria} 
    `
    let divCateg = document.getElementById("listaCateg");
    divCateg.classList.remove("d-none");
    document.querySelector(".categoriaListas").append(li);
    inputCategoria.value = "";
    let nom = document.getElementById("inputNombre");
    nom.disabled = true;

    Toastify({
        text: "Categoría agregada",
        duration: 3000
        }).showToast();
}

inputCategoria.addEventListener("keyup", (e)=>{
    e.preventDefault;    
    if (e.code == "Enter"){
        inputCategoria.value == "" ? Swal.fire( {title: "Debe escribir un nombre de categoria.",  imageUrl: '../images/alertImage.jpg', imageAlt: 'ImagenAlerta'}) : agregoCategoria();
    }
})

boton.addEventListener("click", () => {
    inputCategoria.value == "" ? Swal.fire( {title: "Debe escribir un nombre de categoria.", imageUrl: '../images/alertImage.jpg', imageAlt: 'ImagenAlerta'}) : agregoCategoria();
});


/*Aqui cargo la lista de categorias y muestro el Agregar Productos*/
botonListo.addEventListener("click", ()=>{
    divAgregoCat.style.display = "none";
    divAgregoProd.style.display = "flex";
    let nombreRe = document.getElementById("inputNombre").value;
    let nombreResto = document.getElementById("nombreResto");
    nombreResto.innerText = nombreRe;

    /*Aquí cargo la lista de categorias con un ID*/
    for (let i = 0; i < listaNombreCat.length; i++){
        let cat = new categoria;
        cat.nombre = listaNombreCat[i];
        cat.numero = i + 1 ;
        listaCategoria.push(cat);
    }
    //cargo el select 
    
    for (cat of listaCategoria){
        let opion = document.createElement("option");
        opion.value = cat.numero
        opion.innerHTML = cat.nombre;
        seleccionCategoria.appendChild(opion);
    }
})



/** SECCION PRODUCTOS  */
let product = document.getElementById("inputProducto");
let precio = document.getElementById("precioProducto");
let botonProd = document.getElementById("botonProducto");

let addProducto = () => {
    let prod = new producto;
    prod.categoria = seleccionCategoria.value;
    
    if ( product.value != "" )
    { 
        if (isNaN(precio.value) || precio.value == ""){
            Swal.fire( {title: "El precio debe ser un valor numérico", imageUrl: '../images/alertImage.jpg', imageAlt: 'ImagenAlerta'});
        }else{
            prod.precio = precio.value;
            listaProductos.push(prod);
            Toastify({
                text: "Producto agregado con éxito",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                  }
                }).showToast();
        }
        prod.nombre = product.value.toUpperCase(); 
    }
    else
        { Swal.fire( {title: "Debe escribir un nombre para el producto",  imageUrl: '../images/alertImage.jpg', imageAlt: 'ImagenAlerta'})}
    
    product.value = "";
    precio.value = "";
}


botonProd.onclick = addProducto;

product.addEventListener("keyup", (e)=>{
    e.preventDefault;
    if (e.code == "Enter"){
        precio.focus()
    }
})

precio.addEventListener("keyup", (e)=>{
    e.preventDefault;
    if (e.code == "Enter"){
        addProducto();
        precio.value = "";
        product.value = "";
        product.focus()
    }
})

let mostrar = document.getElementById("showMenu");

const limpiarCarro = () => {
    localStorage.getItem("carrito") == null || localStorage.removeItem("carrito");
}

mostrar.addEventListener("click", () => {
    menu.style.opacity = 1;
    divAgregoProd.style.display = "none";
    let main = document.querySelector("main");
    main.classList.add("bg-foto")
    limpiarCarro();
    cargoCategoriasHTML();
    cargoProductosACategoriasHTML();

    Toastify({
        text: "Toque un producto para agregarlo al carrito.",
        color: "#000000",
        duration: 3000,
        style: {
            background: "linear-gradient(to right, #020f70, #ad2003)",
          }
        }).showToast();

    
})




////////////////////////////////////////////////////////////////
/* FUNCIONES PARA FILTRAR Y BUSCAR */
//Recibo Nombre devuelvo id
function categoriaIDporNombre (nombreCategoria){
    let existeCat = listaCategoria.some(catego => catego.nombre == nombreCategoria.toUpperCase());
    if (existeCat){
        let cat = listaCategoria.find(ca => ca.nombre == nombreCategoria.toUpperCase());
        return cat.numero;
    }else{return ("No existe la categoria.")}
}

/*Recido Id Categoria, retorno lista productos*/
function productosPorCategoria (nroCategoria)  {    
    let prods = listaProductos.filter(prod => prod.categoria == nroCategoria);
    if (prods.length > 0){
            return prods
        } else {
            return ("No se encontraron Productos")
        }
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////


// Creo los divs con las categorias
function cargoCategoriasHTML(){
    let menu1 = document.getElementById("contenidoMenu");
    let divListaProd = document.createElement("div");
    divListaProd.addClass = "flexcentrado";

    listaCategoria.forEach(element => {
        divListaProd.innerHTML += `
        <div class="p-4">
            <h3><strong>${element.nombre}</strong></h3>
        </div>    
        <div>
            <ul id="${element.nombre}">                
            </ul>
        </div>
        `;
        menu1.append(divListaProd);    
    });
}


/* A cada categoria YA EXISTENTE EN EL HTML le agrego sus productos */
function cargoProductosACategoriasHTML(){
    listaCategoria.forEach(element => {
        let nodo = document.getElementById(element.nombre);
        let nro = categoriaIDporNombre(element.nombre);
        let prodsAcargar = productosPorCategoria(nro);
        prodsAcargar.forEach( elem => {

            let {nombre, precio} = elem;

            let li = document.createElement("li");
            li.addEventListener("click", agregoCarrito);
            li.className = ("articuloMenu carrito");
            li.innerHTML = `
            <p class="nomElemCarr">${nombre}</p><p class="precioElemCarr">$ ${precio}</p>
            `;
            nodo.appendChild(li);
        })

    });

}

