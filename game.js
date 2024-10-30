const areaJogo = document.querySelector('#areaJogo');
const ctx = areaJogo.getContext('2d')

const areaLargura = areaJogo.width;
const areaAltura = areaJogo.height;
const tamanho = 20;
const comida = 'red';
const cobraCor = 'green';
let velcidadeX = tamanho;
let velocidadeY = 0;
let comidaX;
let comidaY;
let direcao
let cobra = [
    {x:tamanho * 2, y: 0},
    {x:tamanho, y: 0},
    {x:0, y: 0}
];
const fundoJogo = 'black';


setInterval(() => {
    ctx.fillStyle = fundoJogo;
    ctx.fillRect(0, 0, areaLargura, areaAltura)

    inicia();
    corComida();
    cobraCriada();
    cobraMovendo();
    bateuParede();
    encostouFruta();
    encostouCauda();
}, 90);

comidaCriada();
function inicia(){};

function comidaCriada(){
    function aleatorioComida (min, max) {
        const numero = Math.round((Math.random() * (max - min) + min) / tamanho) * tamanho;
        return numero;
    }
    comidaX = aleatorioComida(0, areaLargura - tamanho);
    comidaY = aleatorioComida(0, areaLargura - tamanho);
    console.log(comidaX);
};

function corComida(){
    ctx.fillStyle = comida;
    ctx.fillRect(comidaX, comidaY, tamanho, tamanho);
};
function cobraCriada(){
    ctx.fillStyle = cobraCor;
    cobra.forEach(cobraPartes => {
        ctx.fillRect(cobraPartes.x, cobraPartes.y, tamanho, tamanho)
    })
};

function cobraMovendo(){
    if(!direcao) return;
    const cabeca = { ...cobra[cobra.length - 1] }

    if(direcao == 'direita') {
        cabeca.x += tamanho;
    }

    if(direcao == 'esquerda') {
        cabeca.x -= tamanho;
    }

    if(direcao == 'baixo') {
        cabeca.y += tamanho;
    }

    if(direcao == 'cima') {
        cabeca.y -= tamanho;
    }

    cobra.push(cabeca)

    if(!encostouFruta()) {
        cobra.shift()
    }
};

document.addEventListener('keydown', ({key}) =>{
    console.log(event.key)

    if(key == 'W' && direcao != 'baixo') {
        direcao = 'cima'
    }

    if(key == 'w' && direcao != 'baixo') {
        direcao = 'cima'
    }

    if(key == 'S' && direcao != 'cima') {
        direcao = 'baixo'
    }

    if(key == 's' && direcao != 'cima') {
        direcao = 'baixo'
    }

    if(key == 'D' && direcao != 'esquerda') {
        direcao = 'direita'
    }

    if(key == 'd' && direcao != 'esquerda') {
        direcao = 'direita'
    }

    if(key == 'A' && direcao != 'direita') {
        direcao = 'esquerda'
    }

    if(key == 'a' && direcao != 'direita') {
        direcao = 'esquerda'
    }
})

function bateuParede(){
    const cabeca = cobra[0]
    if(cabeca.x < 0 || cabeca.x >= areaAltura || cabeca.y < 0 || cabeca.y > areaLargura) {
        cabeca.x = 0;
        location.reload()
        return true;
    }
}


function encostouFruta(){
    const cabeca = cobra[cobra.length - 1];
    if(cabeca.x == comidaX && cabeca.y == comidaY) {
        comidaCriada();
        cobra.push(cabeca)
        ctx.fillStyle = cobraCor;
    cobra.forEach(cobraPartes => {
        ctx.fillRect(cobraPartes.x, cobraPartes.y, tamanho, tamanho)
        return true
    })
}}

function encostouCauda(){
    const cabeca = cobra[cobra.length - 1];
    const bateu = cobra.slice(1, -2).some(position =>
        position.x === cabeca.x && position.y === cabeca.y
);
    
    if(bateu) {
        console.log('bateu')
        location.reload()
    }
}

