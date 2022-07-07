/*  La idea es crear un menú para restaurant dinámico, 
    agregando categorias y a esas categorias 
    platos con su respectivo precio. */

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


let nombre = prompt("Ingresa tu nombre: ")
alert(`Hola ${nombre}, crearemos un menú de restaurant. Escribe las categorias de tu menú, como PASTA, CARNES, POSTRES... ETC.`)
let nroCat = 1;

do {
    let nombreCat = prompt("Ingresa una categoría: ");    
    if (nombreCat != "null") 
    {
        unaCategoria = new categoria(nombreCat, nroCat);
        console.log(unaCategoria);
        listaCategoria.push(unaCategoria);
        nroCat++;
    }
}while(confirm(`¿Desea seguir agregando categorías?`))

alert(`Ok... ahora, agregaremos PLATOS y su PRECIO a cada categoría.`);

let salgo = 0;

do {
    for (cat of listaCategoria){
        alert(`Ahora agregaremos productos a la categoría: ${cat.nombre}`)
        do {
            let nombreProd = prompt(`Nombre del plato para Menú: ${cat.nombre}`);
            if(nombreProd != null){
                let precio = prompt("Precio");
                let unProducto = new producto(cat.numero, nombreProd, precio);
                listaProductos.push(unProducto);
            }
        }while(confirm(`¿Desea agregar otro producto a la categoría ${cat.nombre}?`))
        salgo++;
    }
}while( salgo != listaCategoria.length)

console.log(listaProductos[0].iva());
console.log(listaCategoria);
console.log(listaProductos);

