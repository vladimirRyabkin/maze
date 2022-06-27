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
 console.log('для решения этой не простой задачки тебе потребовалось'+ timer.textContent);
}

btn.forEach(element => {
    element.addEventListener('click', () => {
        const player = document.querySelector('.player');
        const coordPlayerX = player.attributes.x.value;
        const coordPlayerY = player.attributes.y.value;
        
        function clear() {
            setTimeout (() => {
                player.classList.remove('playerInWall')
            }, 300)
        }

        if (element.className === 'controlup') {
            let player = table.querySelector(`[x = "${+coordPlayerX}" ][y = "${+coordPlayerY}"]`);
            let step = table.querySelector(`[x = "${+coordPlayerX - 1}" ][y = "${+coordPlayerY}"]`);
            if (step === null) {
                player.classList.add('playerInWall')
                countWrong();
                soundWall();
                clear()
                return;
            }
            if (step.className === 'wall') {
                player.classList.add('playerInWall')
                clear()
                soundWall();
                countWrong();
                return;
            } else if (step.className === 'finish') {
                soundFanfar();
                result();
                step.classList.add('fanfare');
                player.classList.remove('player');
            } else {
                soundClick();
                countStep();
                step.classList.add('player');
                player.classList.remove('player');
            }
        }

        if (element.className === 'controldown') {
            let player = table.querySelector(`[x = "${+coordPlayerX}" ][y = "${+coordPlayerY}"]`);
            let step = table.querySelector(`[x = "${+coordPlayerX + 1}" ][y = "${+coordPlayerY}"]`);
            if (step === null) {
                player.classList.add('playerInWall')
                soundWall();
                clear()
                countWrong();
                return;
            }
            if (step.className === 'wall') {
                player.classList.add('playerInWall')
                soundWall();
                clear()
                countWrong();
                return;
            } else {
                soundClick();
                countStep();
                step.classList.add('player');
                player.classList.remove('player');
            }
        }

        if (element.className === 'controlleft') {
            let player = table.querySelector(`[x = "${+coordPlayerX}" ][y = "${+coordPlayerY}"]`);
            let step = table.querySelector(`[x = "${+coordPlayerX}" ][y = "${+coordPlayerY - 1}"]`);
            if (step === null) {
                player.classList.add('playerInWall')
                clear()
                soundWall();
                countWrong();
                return;
            }
            if (step.className === 'wall') {
                player.classList.add('playerInWall')
                soundWall();
                countWrong();
                clear()
                return;
            } else {
                countStep();
                soundClick();
                step.classList.add('player');
                player.classList.remove('player');
            }
        }

        if (element.className === 'controlright') {
            let player = table.querySelector(`[x = "${+coordPlayerX}" ][y = "${+coordPlayerY}"]`);
            let step = table.querySelector(`[x = "${+coordPlayerX}" ][y = "${+coordPlayerY + 1}"]`);
            if (step === null) {
                player.classList.add('playerInWall')
                soundWall();
                clear()
                countWrong();
                return;
            }
            if (step.className === 'wall') {
                player.classList.add('playerInWall')
                soundWall();
                clear()
                countWrong();
                return;
            } else {
                soundClick();
                countStep();
                player.classList.remove('player');
                step.classList.add('player');
            }
        }
    });
});
