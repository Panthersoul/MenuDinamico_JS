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



(function () {

    if (localStorage.getItem("categorias") != null){
        Swal.fire({
            title: 'Desea utilizar el menú ya cargado?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            customClass: {
              actions: 'my-actions',
              cancelButton: 'order-1 right-gap',
              confirmButton: 'order-2',
              denyButton: 'order-3',
            }
          }).then((result) => {
            if (result.isConfirmed) { 
                    divAgregoCat.style.display = "none";
                    divAgregoProd.style.display = "none";
                    menu.style.opacity = 1;
                    cargoMenuLocal();
                    //cargoProductosACategoriasHTML()
              
            } else if (result.isDenied) {
                localStorage.removeItem("productosMenu");
                localStorage.removeItem("categorias");
                localStorage.removeItem("nombreResto");
                localStorage.removeItem("carrito");
            }
          })
    }

})();




/*Escondo Menu*/
menu.style.opacity = 0;
divAgregoProd.style.display = "none";

let listaNombreCat = [];
const agregoCategoria = (e) => {
    let valorCategoria = inputCategoria.value.toUpperCase() 
    

    /*Cargo las categorías al localstorage*/
    if (localStorage.getItem("categorias") == null){
        listaNombreCat.push(valorCategoria);
        localStorage.setItem("categorias", JSON.stringify(listaNombreCat));
    }else{
        const listado = JSON.parse(localStorage.getItem("categorias"));
        listado.push(valorCategoria);
        localStorage.setItem("categorias", JSON.stringify(listado));
    }
    

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
    localStorage.setItem("nombreResto", nombreRe)

    let listaCategorias = JSON.parse(localStorage.getItem("categorias"))
    let categoriasID = [];
    /*Aquí cargo la lista de categorias con un ID*/
    for (let i = 0; i < listaCategorias.length; i++){
        let cat = new categoria;
        cat.nombre = listaCategorias[i];
        cat.numero = i + 1 ;
        categoriasID.push(cat);
    }
    
    localStorage.setItem("categorias", JSON.stringify(categoriasID));
    //cargo el select 
    for (cat of categoriasID){
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
            prod.nombre = product.value.toUpperCase(); 
            prod.precio = precio.value;

                /*Cargo los productos al localstorage*/
                 if (localStorage.getItem("productosMenu") == null){
                    listaProductos.push(prod);
                    localStorage.setItem("productosMenu", JSON.stringify(listaProductos));
                }else{
                    const listado = JSON.parse(localStorage.getItem("productosMenu"));
                    listado.push(prod);
                    localStorage.setItem("productosMenu", JSON.stringify(listado));
                }

            Toastify({
                text: "Producto agregado con éxito",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                  }
                }).showToast();
        }
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

function agregarImagenFondo() {
    let clase = document.createAttribute("style") ;
    let main = document.querySelector("main");   
    
    fetch('https://foodish-api.herokuapp.com/api/')
    .then(response => response.json())
    .then(result => {
        clase.value = (`background-image: url("${result.image}");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover; 
        height: 100vh;
        `);
        main.setAttributeNode(clase);
    })
    
    
    /*
    clase.value = (`background-image: url("../images/pexels-anna-guerrero-1765005.webp");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover; 
    height: 100vh;
    `);
    main.setAttributeNode(clase);*/
}


mostrar.addEventListener("click", () => {
    menu.style.opacity = 1;
    divAgregoProd.style.display = "none";
    
    agregarImagenFondo();
    limpiarCarro();
    cargoCategoriasHTML();
    cargoProductosACategoriasHTML();
    setTimeout(()=>{
        Toastify({
            text: "Toque un producto para agregarlo al carrito.",
            color: "#000000",
            duration: 3000,
            position: "top-center",
            style: {
                background: "linear-gradient(to right, #020f70, #ad2003)",
              }
            }).showToast();
    }, 5000)

})



////////////////////////////////////////////////////////////////
/* FUNCIONES PARA FILTRAR Y BUSCAR */
//Recibo Nombre devuelvo id
function categoriaIDporNombre (nombreCategoria){
    listadoCategorias = JSON.parse(localStorage.getItem("categorias"));


    let existeCat = listaCategoria.some(catego => catego.nombre == nombreCategoria.toUpperCase());
    if (existeCat){
        let cat = listaCategoria.find(ca => ca.nombre == nombreCategoria.toUpperCase());
        return cat.numero;
    }else{return ("No existe la categoria.")}
}

/*Recido Id Categoria, retorno lista productos*/
function productosPorCategoria (nroCategoria)  {    

    listaProductos = JSON.parse(localStorage.getItem("productosMenu"));
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
    const categoriaStore = JSON.parse(localStorage.getItem("categorias"));
    divListaProd.addClass = "flexcentrado";
    categoriaStore.forEach(element => {
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

    listadoCategorias = JSON.parse(localStorage.getItem("categorias"));
    listadoCategorias.forEach(element => {
        let nodo = document.getElementById(element.nombre);
        
        let prodsAcargar = productosPorCategoria(element.numero);
        
        prodsAcargar.forEach(elem => {
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


function cargoMenuLocal () {
    //let listCat = JSON.parse(localStorage.getItem("categorias"));
    limpiarCarro();
    agregarImagenFondo();
    cargoCategoriasHTML();
    cargoProductosACategoriasHTML();
    let nombreResto = document.getElementById("nombreResto");    
    nombreResto.innerText = localStorage.getItem("nombreResto");
    setTimeout(()=>{
        Toastify({
            text: "Toque un producto para agregarlo al carrito.",
            color: "#000000",
            duration: 3000,
            position: "top-center",
            style: {
                background: "linear-gradient(to right, #020f70, #ad2003)",
              }
            }).showToast();
    }, 5000)
}

