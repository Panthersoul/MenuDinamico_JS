let numero1
let numero2 

do{
    numero1 = prompt("ingrese un nro")
    numero2 = prompt("ingrese otro nro")
}while ((numero1.toUpperCase() == "ESC") || (numero2.toUpperCase() == "ESC") || numero1.isNaN || numero2.isNaN)




if (numero1 >= numero2){
 alert("El primer numero no puede ser mayor o igual que el segundo")
}else if (numero1 < numero2){
    for (let i = numero1; i <= numero2; i++){
        console.log(i)
    }
}
