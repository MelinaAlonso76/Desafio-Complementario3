class Auto{
    constructor(patente, hora){
        this.patente = patente
        this.hora = hora
    }
}

let autos = []
const capacidad = 10
let autosIngresados = 0
let opcion = 0

function ingresarAutos(){
    if(autosIngresados>capacidad-1){
        alert('Estacionamiento completo')
        document.getElementById('brand-title').innerHTML = 'ESTACIONAMIENTO LLENO'
    }else{
        let placa = verificoPatente()
        let ingreso = new Date()
        ingreso.toLocaleDateString()
        if(autos.find((el)=>el.patente === placa)){
            alert('No pueden haber dos patentes iguales')
        }else{
            autos.push(new Auto(placa,ingreso))
            autosIngresados = autosIngresados + 1
        }
    }
}

function verificoPatente(){
    let patente = document.getElementById('placa').value.toLowerCase()
    let patenteVieja = /^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$/
    let patenteNueva = /^[a-zA-Z]{3}[0-9]{3}$/
    if(patenteVieja.test(patente) || patenteNueva.test(patente)){
        return patente
    }else{
        alert('La patente ingresada no es correcta')
    }
}

function retirarAutoPorPatente(){
    let placa = verificoPatente()
    let existe= autos.findIndex(Auto=>Auto.patente === placa)
    if(existe != -1){
        alert('¡Su auto fue retirado con éxito!')
        autos.splice(existe,1)
        autosIngresados = autosIngresados - 1
    }else{
        alert('El vehiculo con patente: '+placa+' nunca fue ingresado o ya ha sido retirado')
    }
}

let patente = document.getElementById('placa')
let btnIngreso = document.getElementById('ingreso')
let btnSalida = document.getElementById('salida')
let btnEstacionados = document.getElementById('estacionados')

btnIngreso.addEventListener('click',(e)=>{
    if(patente.value.length === 0){
        e.preventDefault()
        alert('El campo debe estar completo')
    }else{
        ingresarAutos()
        patente.value = ''
    }
})

btnSalida.addEventListener('click',(e)=>{
    if(patente.value.length === 0){
        e.preventDefault()
        alert('El campo debe estar completo')
    }else{
        retirarAutoPorPatente()
        patente.value= ''
    }
})

btnEstacionados.addEventListener('click',()=>{
    console.clear()
    for(let i = 0 ; i < autos.length; i++){
        if(autos[i].patente !== undefined){
            console.table(autos[i])
        }
    }
})