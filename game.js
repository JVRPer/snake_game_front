const quadrado = document.getElementById('quadrado');
const maca = document.getElementById('maca');
const movimentos = 16;
let y = 120;
let x = 0;
const containerWidth = 500;
const containerHeigth = 600;

document.addEventListener('keydown', event => {

    if (event.key) {

        switch(event.key) {
            case 'W':
            case 'w':
                if (y >= 130) y -= movimentos;
                break;
            case 'S':
            case 's':
                if (y < containerHeigth - quadrado.offsetHeight) y += movimentos;
                break;
            case 'A':
            case 'a':
                if (x > 13) x -= movimentos + 3;
                break;
            case 'D':
            case 'd':
                if (x < 480) x += movimentos + 0.7;
                break;
        }

        quadrado.style.top = `${y}px`;
        quadrado.style.left = `${x}px`;
        movimentos -= 7;
        colisao();
    }
});

function colisao() {

    const quadradoArea = quadrado.getBoundingClientRect();
    const macaArea = maca.getBoundingClientRect();

    const colisao = !(quadradoArea.right < macaArea.left ||
                      quadradoArea.left > macaArea.right ||
                      quadradoArea.bottom < macaArea.top ||
                      quadradoArea.top > macaArea.bottom);
    if (colisao) {
        quadrado.style.width = `${quadradoArea.width + 5}px`;

        const maxtop =  containerHeigth - maca.offsetHeight;
        const maxleft = containerWidth - maca.offsetWidth;
        
        const posicaoAleatoriaLeft = Math.random() * maxleft;
        const posicaoAleatoriaTop = Math.random() * maxtop;

        maca.style.left = `${Math.round(posicaoAleatoriaLeft)}px`;
        maca.style.top = `${posicaoAleatoriaTop}px`;
    }
}