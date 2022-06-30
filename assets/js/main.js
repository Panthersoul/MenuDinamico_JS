const respuesta = "AJO"
let contador = 0
let acierto = false
let intento = ""
let respuestas = []
/*Esta variable la uso para salir del loop*/
let salgo = true


let nombre = prompt("Ingresa tu nombre: ")
alert("OK " + nombre + ", iremos por una adivinanza. Tendrás solo 3 intentos.")


do{
    intento = prompt("Si me arrancas la piel no lloraré, ¡pero tú sí!, ¿Quién soy?")    
    
    respuestas.push(intento)

    if (intento.toUpperCase() === respuesta){ 
        acierto = true
        salgo = false
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
        case 3:{
            console.log("Suerte en la proxima")
            salgo = false
            break
        }
    }    

}while (salgo)


if (acierto)
        alert("Lo has hecho muy bien!")
   else if (acierto == false)
    for (let i = 0; i < respuestas.length; i++){
        console.log("Respuesta "+[i + 1]+" : "+respuestas[i])    
    }
    alert("Intenta de nuevo recargando la pagina! Buena suerte la proxima!")
