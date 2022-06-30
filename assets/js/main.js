const respuesta = "AJO"
let contador = 0
let acierto = false
let intento = ""

let nombre = prompt("Ingresa tu nombre: ")
alert("OK " + nombre + ", iremos por una adivinanza. Tendrás solo 3 intentos.")


do{
    intento = prompt("Si me arrancas la piel no lloraré, ¡pero tú sí!, ¿Quién soy?")    

    if (intento.toUpperCase() === "AJO"){ 
        acierto = true
    }else{
        contador = contador + 1
        
        /*Registro los intentos*/
        console.log("Intento: "+ contador)
    }
    
    /*Aqui devuelvo mensajes segun el contador...*/
    switch (contador){
        case 1: {
            console.log("Aqui una pista... no es la cebolla.")    
            break
        }
        case 2:{
            console.log("...casi casi!")
            break
        }
        default : 
            break
    }    
       
}while (acierto || contador != 3 )


if (acierto == true)
        alert("Lo has hecho muy bien!")
   else {
        alert("Intenta de nuevo recargando la pagina! Buena suerte la proxima!")
    }
