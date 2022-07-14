/*  La idea es crear un menú para restaurant dinámico, 
    agregando categorias y a esas categorias 
    platos con su respectivo precio. Y luego realizar las comandas*/

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

/****************************************** */

/*AQUI CARGO DATOS DE PRUEBA*/
        /*
            listaCategoria.push({nombre: 'PASTA', numero: 1});
            listaCategoria.push({nombre: 'CARNES', numero: 2});
            listaCategoria.push({nombre: 'POSTRES', numero: 3});

            listaProductos.push({categoria: 1, nombre: 'Ravioles', precio: '120'});
            listaProductos.push({categoria: 1, nombre: 'Sorrentinos', precio: '150'});
            listaProductos.push({categoria: 1, nombre: 'Tortelines', precio: '200'});
            listaProductos.push({categoria: 2, nombre: 'Bife', precio: '200'});
            listaProductos.push({categoria: 2, nombre: 'Asado', precio: '300'});
            listaProductos.push({categoria: 3, nombre: 'Helado', precio: '120'});
            listaProductos.push({categoria: 3, nombre: 'Budín', precio: '44'});
            listaProductos.push({categoria: 3, nombre: 'Alfajor', precio: '88'});
        */

/***************************************** */


let nombre = prompt("Ingresa el nombre de tu Restaurant: ")
alert(`Hola ${nombre}, crearemos un menú. Escribe las categorias de tu menú, como PASTA, CARNES, POSTRES... ETC.`)
let nroCat = 1;

/* AQUI PIDO LAS CATEGORIAS A MANO */
 do {
     let nombreCat = prompt("Ingresa una categoría: ");    
     if (nombreCat != "null") 
     {
         unaCategoria = new categoria(nombreCat, nroCat);
         //console.log(unaCategoria);
         listaCategoria.push(unaCategoria);
         nroCat++;
     }
 }while(confirm(`¿Desea seguir agregando categorías?`))


///////////////////////////////////

// /*  AQUI ITERO SOBRE LAS CATEGORIAS PARA PEDIR LOS PRODUCTOS */
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

//////////////////////////////////

/* FUNCIONES PARA FILTRAR Y BUSCAR */

/*Recibe el nombre de una categoria y devuelve su ID*/
function categoriaIDporNombre (nombreCategoria){
    let existeCat = listaCategoria.some(catego => catego.nombre == nombreCategoria.toUpperCase());
    if (existeCat){
        let cat = listaCategoria.find(ca => ca.nombre == nombreCategoria.toUpperCase());
        return cat.numero;
    }else{return ("No existe la categoria.")}
}

/*Recibe el ID de categoria y devuelve todos los productos asociados*/
function productosPorCategoria (nroCategoria)  {    
    let prods = listaProductos.filter(prod => prod.categoria == nroCategoria);
        if (prods.length > 0){
            return prods
        } else {
            return ("No se encontraron Productos")
        }
}

/**/
let produ = prompt("Escribe una categoria para ver sus productos: ")
let idCat = categoriaIDporNombre(produ);
let products = productosPorCategoria(idCat);

console.log(products);

/*
console.log(listaCategoria);
console.log(listaProductos);
*/