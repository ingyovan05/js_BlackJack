

let deck =[]
const tipos =['C','D','H','S']
const especiales =['A','J','Q','K']

let puntosJugador =0
let puntosComputadora=0

//Referncias del HTML
const btnNuevo = document.querySelector('#btnNuevo')
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')

const divCartasJugador =document.querySelector("#jugador-cartas")

const divCartasComputadora =document.querySelector("#computadora-cartas")

const puntosHTML = document.querySelectorAll('small')

const crearDeck = () =>{
    for (let i=2 ; i<=10;i++){
        for (let tipo of tipos){
            deck.push(i+tipo)
        }
    }
    for (let tipo of tipos){
        for (let especial of especiales){
            deck.push(especial+tipo)
       }        
    }
    deck =_.shuffle(deck)
    // console.log(deck)
    return deck
}

crearDeck()

//funcion pedir carta

const pedirCarta =() =>{
    if (deck.length===0){
        throw 'No hay cartas en el deck'
    }
    const carta = deck.pop()  
    // console.log(carta)  
    return carta
}
// 
// pedirCarta()

const valorCarta = (carta) =>{
    const valor = carta.substring(0,carta.length-1)
    return (isNaN(valor)) ? (valor === 'A' ? 11 : 10)  :valor *1
    // let puntos =0
    // if (isNaN(valor)){
    //     puntos = (valor === 'A' ? 11 : 10)        
    // }else {
    //     puntos=valor*1
    // }
    //return puntos
}

// console.log(valorCarta(pedirCarta()))

//turno de la computadora

const turnoComputadora =(puntoMinimos) => {
    do {
        const carta =pedirCarta() 
        puntosComputadora=puntosComputadora+valorCarta(carta)
        puntosHTML[1].innerText = puntosComputadora
        const imgCarta = document.createElement('img')
        imgCarta.src=`assets/cartas/${ carta }.png`
        imgCarta.classList.add('carta')
        divCartasComputadora.append(imgCarta)
     }while (puntosComputadora <= puntoMinimos && puntoMinimos<=21)

     setTimeout(() => {
        if (puntosComputadora > 21) {
            alert('Computadora perdio')
         } else if (puntosComputadora >= puntoMinimos || puntosJugador>21){
            alert('Computadora Gano')
         }  
     }, 10);




}

//Eventos

btnPedir.addEventListener('click', () => {

        const carta =pedirCarta() 
        puntosJugador=puntosJugador+valorCarta(carta)
        puntosHTML[0].innerText = puntosJugador
        const imgCarta = document.createElement('img')
        imgCarta.src=`assets/cartas/${ carta }.png`
        imgCarta.classList.add('carta')
        divCartasJugador.append(imgCarta)
        if (puntosJugador>21){
            // console.warn('Lo siento perdiste')
            btnPedir.disabled=true
            btnDetener.disabled=true
         turnoComputadora(puntosJugador)
        }   else if (puntosJugador===21){
            // console.warn('21, genial')
            turnoComputadora(puntosJugador)
            btnPedir.disabled=true
            btnDetener.disabled=true }

})

btnDetener.addEventListener('click', () => {
    btnDetener.disabled=true
    btnPedir.disabled=true
    turnoComputadora(puntosJugador)
})

btnNuevo.addEventListener('click', () => {
    deck =crearDeck()

    btnDetener.disabled=false
    btnPedir.disabled=false
    puntosComputadora=0
    puntosJugador=0
    puntosHTML[0].innerText = puntosJugador
    puntosHTML[1].innerText = puntosComputadora

    divCartasJugador.innerHTML=""
    divCartasComputadora.innerHTML=""
})

