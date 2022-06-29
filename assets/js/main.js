let nombre = prompt("Ingresa tu nombre: ")
alert("Iremos por una adivinanza: <br>")

do{
    nro1 = prompt("Ingresa el número inicial (o ESC para salir): ")    
    if (isNaN(nro1)){ 
        alert("No por favor, ingresa un número correcto.")
        location.reload();
    }
    nro2 = prompt("Ingresa el número final (o ESC para salir): ")    
    if (isNaN(nro2) && (nro2 > nro1)){ 
        alert("El segundo ingreso debe ser numerico y mayor que el primer nro")
        location.reload();
    }
    if (nro1 >= nro2){
        alert("El primer numero no puede ser mayor o igual que el segundo")
       }else if (nro1 < nro2){
           for (let i = nro1; i <= nro2; i++){
               console.log(i)
           }
       }
       
}while ((nro1.toUpperCase() == "ESC") || (nro2.toUpperCase() == "ESC"))

/*
-Tiene dientes y no come, tiene cabeza y no es hombre. (Ajo)




alert("Hola... aquí podes sacar tu entrada.")
let nombre = prompt("Escribe tu nombre para empezar: ")
let pelicula = prompt("Ahora, escribe la pelicula que quieres ver")
let edad = prompt("Edad?")
let compas = prompt("Por ultimo, la cantidad de compañeros")



*/

if (nro1 >= nro2){
 alert("El primer numero no puede ser mayor o igual que el segundo")
}else if (nro1 < nro2){
    for (let i = nro1; i <= nro2; i++){
        console.log(i)
    }
}
