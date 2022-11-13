const CARDS = 10;

// peticion de pokemon aleatorio al API

for(let i=1; i<= CARDS; i++){
    let id = getRandomID(151)
    searchPokemById(id)
}

function getRandomID(max){
    return Math.floor(Math.random()*max)+1
}

let draggableElements = document.querySelector('.draggable-elements');
let droppableElements = document.querySelector('.droppable-elements');

let pokemonSearched = [];
let pokemonNames = [];

async function searchPokemById(id){
    //API pokemon-pokemon
    const res =  await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await res.json()
    //arreglo con los pokemon
    pokemonSearched.push(data)
    //arreglo con los nombres de los pokemon
    pokemonNames.push(data.name)
    pokemonNames = pokemonNames.sort(()=>Math.random()-0.5)


    //dibuja el pokemon en pantalla
    draggableElements.innerHTML = ''
    pokemonSearched.forEach(pokemon =>{
        draggableElements.innerHTML += `            
            <div class="pokemon">
                <img id="${pokemon.name}" class="image" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="pokemon">
            </div>
            `
    })
    //dibuja le nombre del pokemon
    droppableElements.innerHTML = '' 
    pokemonNames.forEach(names => {
        droppableElements.innerHTML += `
        <div class="names">
            <p>${names}</p>
        </div>
        `
    })

    //elementos a arrastrar
    let pokemons = document.querySelectorAll('.image');
    pokemons = [...pokemons];
    pokemons.forEach(pokemon =>{
        pokemon.addEventListener('dragstart', event=>{
            event.dataTransfer.setData('text', event.target.id)
        })
    })

    //elementos a recibir
    let names = document.querySelectorAll('.names')
    let wrongMSG = document.querySelector('.wrong')
    let points = 0;

        names = [...names]
        names.forEach(name =>{
            name.addEventListener('dragover', event=>{
                event.preventDefault()
            })
            name.addEventListener('drop', event=>{
                const draggableElementData = event.dataTransfer.getData('text');
                //elemento que selecciona el ID
                let pokemonElement = document.querySelector(`#${draggableElementData}`)
                
                if(event.target.innerText == draggableElementData){
                    console.log('SI')
                    points++
                    event.target.innerHTML = ''
                    event.target.appendChild(pokemonElement)
                    wrongMSG.innerText = ''

                    if(points == CARDS){
                        draggableElements.innerHTML = `<p class='win'>YEEEY!</p>`
                        
                        Swal.fire({
                            title: 'Quieres jugar de nuevo?',
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: 'PLAY',
                            denyButtonText: `Don't save`,
                          }).then(function(){
                            location.reload();
                          })
                    }

                }else{
                    console.log('NO')
                    wrongMSG.innerText ='Ups! Try again'
                }

            })

        })

}

