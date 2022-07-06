/*La idea es crear un menú dinámico, agregando categorias y a esas categorias platos con su precio. */

//El producto esta asociado a una categoria
class producto {
    constructor (categoria, nombre, precio){
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = precio;
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

let nombre = prompt("Ingresa tu nombre: ")
alert(`Hola ${nombre}, con este simulador crearemos un menú de restaurant.`)
alert("Escribe las categorias de tu menú, como PASTA, CARNES, ETC.")
let nroCat = 1;

do {
    let nombreCat = prompt("Ingresa una categoría: ");    
    if (nombreCat != nombreCat.toUpperCase("ESC")) 
    {
        unaCategoria = new categoria(nombreCat, nroCat);
        listaCategoria.push(unaCategoria);
        console.log(listaCategoria);
        nroCat++;
    }
}while(confirm(`¿Desea seguir agregando categorías?`))

alert(`Ok... ahora, agregaremos platos con su precio a cada categoría.`);

let salgo = 0;
do {
    debugger  
    for (cat of listaCategoria){
        alert(`Ahora agregaremos productos a la categoría: ${cat.nombre}`)
        do {
            let nombreProd = prompt("Nombre del plato:");
            let precio = prompt("Precio");
            let unProducto = new producto(cat.numero, nombreProd, precio);
            listaProductos.push(unProducto);
        }while(confirm(`¿Desea agregar otro producto a esta categoría?`))
        salgo++;
    }
}while( salgo != listaCategoria.length)

console.log(listaCategoria);
console.log(listaProductos);

