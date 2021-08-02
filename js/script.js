const grid = document.getElementById('grid') ;
const pop_btn = document.getElementById('N') ;
const start = document.getElementById('start') ;
const reset_btn = document.getElementById('reset') ;

let loop;
let grille = [] ;
let running = false ;

const next_to = (tab,i,j) => [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
.reduce( 
    (acc,[x,y]) => !tab[i+x] ? acc : tab[i+x][j+y] ? acc+1 : acc  
    ,0
) ;

function taille ()  {
    return Number(pop_btn.value)
} ;

function init () {
    grille = [...Array(taille())].map( () => {
        let ligne = document.createElement('div') ;
        grid.appendChild(ligne) ;
        return [
            ...Array(taille())
        ].map( () => {
            let statut = Math.floor(100*Math.random()) > 80 ;
            let cellule = document.createElement('div') ;
            cellule.className = statut ? "vie" : "mort" ;
            ligne.appendChild(cellule) ;
            return statut
        })
    })
} ;

function generation_suivante () {
    grille = [...grille].map( 
        (l,i) => l.map( 
            (x,j) => {
                let nbr_voisins = next_to(grille,i,j) ;
                return nbr_voisins == 3 ? true : nbr_voisins != 2 ? false : x 
            } 
        ) 
    )
    affiche() ;
} ;

function affiche () {
    [...grid.children].map( (ligne,i) => {
        [...ligne.children].map( (cellule,j) => {
            cellule.className = grille[i][j] ? "vie" : "mort"
        })
    })
} ;

start.addEventListener('click', () => {
    if (running) {
        console.log('already running')
    } else {
        init() ;
        loop = setInterval(generation_suivante,50) ;
        running = true ;
    }
}) ;

reset_btn.addEventListener('click', () => {
    clearInterval(loop) ;
    grille = [] ;
    grid.innerHTML = "" ;
    running = false ;
}) ;