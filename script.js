const conteiner = document.querySelector('.conteiner');
const info = document.querySelector('.info');
const couterStep = document.querySelector('.couterStep');
const couterWrong = document.querySelector('.couterWrong');
const timer = document.querySelector('.timer');
const maze = document.querySelector('.maze');
const table = document.querySelector('table');
const control = document.querySelector('.control');
const btn = document.querySelector('.control').querySelectorAll('button');
let i = 0;
let j = 0;

const direction = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight'
}

function countStep() {
    i += 1;
    couterStep.textContent = 'Сделано ходов: ' + i;
}

function countWrong() {
    j += 1;
    couterWrong.textContent = 'Сделано ошибок:' + j;
}

function soundClick() {
    let audio = new Audio();
    audio.src = 'klaves-odinochnyiy-schelchok.mp3';
    audio.autoplay = true;
}

function soundWall() {
    let audio = new Audio();
    audio.src = 'udar-po-metallicheskoy-bochke-24318.mp3';
    audio.autoplay = true;

}

function soundFanfar() {
    let audio = new Audio();
    audio.src = 'torjestvennyiy-zvuk-fanfar.mp3';
    audio.autoplay = true;
}

function result() {
    console.log('это было не просто, но ты справился');
    console.log('сделано ходов: ' + i);
    console.log('допущено ошибок: ' + j);
    console.log('для решения этой не простой задачки тебе потребовалось' + timer.textContent);
}

function clear(player) {
    setTimeout(() => {
        player.classList.remove('playerInWall')
    }, 300)
}

document.addEventListener('keydown', event => {
    const player = document.querySelector('.player');
    if (!event.code.includes('Arrow')) {
        return;
    }
    keyHandler(event.code, player)
});

function keyHandler(direct, player) {
    const currentX = player.attributes.x.value;
    const currentY = player.attributes.y.value;
    const nextX = direct === direction.up
        ? +currentX - 1
        : direct === direction.down
            ? +currentX + 1
            : currentX
    const nextY = direct === direction.left
        ? +currentY - 1
        : direct === direction.right
            ? +currentY + 1
            : currentY
    const nextElement = getElement(nextX, nextY);

    if (nextElement === null) {
        player.classList.add('playerInWall')
        countWrong();
        soundWall();
        clear(player)
        return;
    }
    if (nextElement.classList.contains('wall')) {
        player.classList.add('playerInWall')
        clear(player)
        soundWall();
        countWrong();
        return;
    } else if (nextElement.classList.contains('finish')) {
        soundFanfar();
        result();
        nextElement.classList.add('fanfare');
        player.classList.remove('player');
    } else {
        soundClick();
        countStep();
        nextElement.classList.add('player');
        player.classList.remove('player');
    }
}

function getElement (x, y) {
   return table.querySelector(`[x = "${x}" ][y = "${y}"]`);
}

btn.forEach(element => {
    element.addEventListener('click', () => {
        const player = document.querySelector('.player');
        keyHandler(element.className, player)
    });
});
