const score = document.querySelector('.score');
const gameStart = document.querySelector(".gameStart");
const gameArea = document.querySelector(".gameArea");
const body = document.querySelector('body');
const end = document.querySelector('.end');
const enemy_audio = document.querySelector("#enemy_audio")
const endGameAudio = document.querySelector("#end-game-audio")
let masterAudio = document.querySelector(".masterAudio")
let sound;
let lifeCounter = 0
let counter = 0
let soundTrack = []
let myInterval;
let audioSrc = [{
        src: "./audio/cow.mp3",
        dataAns: 0
    },
    {
        src: "./audio/deer.mp3",
        dataAns: 1
    },
    {
        src: "./audio/horse.mp3",
        dataAns: 2
    },
    {
        src: "./audio/lion.mp3",
        dataAns: 3
    },
    {
        src: "./audio/elephant.mp3",
        dataAns: 4
    },
    {
        src: "./audio/dog.mp3",
        dataAns: 5
    },
]
let carsImg = ['0', '1', '2', '3', '4', '5'];
let winFlag = false
$(".audio-btn").click(function () {
    soundTrack = []
    if (!$('.gameStart').hasClass("hide") || !$(".audio-btn").hasClass("clicked")) {
        start()
        myInterval = setInterval(() => {
            player.score--;
            // console.log('timer', player.score);
            if (player.score < 0) {
                $(".audio-btn").css("pointer-events", "none")
                $('.enemy').remove()
                clearInterval(myInterval)
                clearInterval(setEnemy)
                winning()
                endGame()
            }
            scoreCounter()
        }, 500);
    }
    fnAudio(enemy_audio)
})
$('.masterAudio').click(() => {
    // masterAudio.play()
    fnAudio(masterAudio)
})

//Object which init game play
let player = {
    speed: 10,
    score: 30
};

//Object which tracks the keyPresses
let keys = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false
}

//Welcome window


//KeyPress Event
window.document.addEventListener('keydown', pressOn);
window.document.addEventListener('keyup', pressOff);

//functions which tracks the keypress events

function pressOn(event) {
    keys[event.key] = true;
    //console.log(keys);
}

function pressOff(event) {
    keys[event.key] = false;
    //console.log(keys);
}
 let setEnemy
function createLines(){
    for (let i = 0; i < 5; i++) { //RoadLines
        let div = document.createElement('div');
        let div2 = document.createElement('div');
        div.classList.add("line");
        div2.classList.add("line2");
        div.y = (i * 150);
        div2.y = (i * 150);
        div.style.top = (i * 150) + 'px';
        div2.style.top = (i * 150) + 'px';
        gameArea.appendChild(div);
        gameArea.appendChild(div2);
    }
    moveLines()
}

function createNewLin(i){
    let div = document.createElement('div');
    let div2 = document.createElement('div');
    div.classList.add("line");
    div2.classList.add("line2");
    div.y = (i * 150);
    div2.y = (i * 150);
    div.style.top = (i * 150) + 'px';
    div2.style.top = (i * 150) + 'px';
    gameArea.appendChild(div);
    gameArea.appendChild(div2);
}
//function which starts the game Play
function start() {
    // clearInterval(myInterval)
    // player.score = 30
    player.start = true;
    soundTrack = []
    
    $(".audio-btn").addClass("clicked")
    $(".audio-btn").addClass("started")
    $(".gameOver").addClass("hide")
    $(".gameOver2").addClass("hide")
    fnAudio(enemy_audio)
    gameArea.innerHTML = "";
    gameStart.classList.add('hide');
    // player.start = true;
    if ($('.audio-btn').hasClass('started')) {
        createLines()
    }
    
    window.requestAnimationFrame(playGame);
    let car = document.createElement('div');
    car.setAttribute("class", "car");
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    // console.log(player.speed);
    const indexes = randomIndex()
    indexes.forEach((x, i) => {
        soundTrack = indexes
        let enemy = document.createElement('img');
        enemy.setAttribute("src", `./images/E${carsImg[x]}.png`)
        enemy.setAttribute("id", x)
        enemy.classList.add("enemy");
        enemy.classList.add("enemy-top");
        enemy.y = 15;
        enemy.style.top = -15 + 'px';
        enemy.style.left = (i * 200) + 50 + 'px';
        enemy.style.backgroundColor = 'black'
        gameArea.prepend(enemy);
        sound = Math.floor(Math.random() * 3)
        // console.log(audioSrc[indexes[sound]].dataAns);
        enemy_audio.setAttribute("data-ans", audioSrc[indexes[sound]].dataAns)
        enemy_audio.setAttribute("data-audioSrc", audioSrc[indexes[sound]].src)
        fnAudio(enemy_audio)
    })
    setEnemy = setInterval(() => {
        enemyCars(car);
    }, 500)
}

//function which starts the game play
function playGame() {
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();
    score.style.display = "flex";
    $(".score2").css('display', "flex");
    if (player.start) {

        if (keys.ArrowUp && (player.y > (road.top = -250))) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < (road.bottom - 200)) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < (road.width - 0)) {
            player.x += player.speed;
        }
        car.style.left = player.x + 'px';
        car.style.top = player.y + 'px';

        scoreCounter()

        score.innerText = "Timer : " + player.score;

        window.requestAnimationFrame(playGame);
    }
}

function scoreCounter() {
    $(".score2").html("Score : " + counter)
}

//Function which moves lines
function moveLines() {
    let lines = document.querySelectorAll('.line');
    let lines2 = document.querySelectorAll('.line2');
    // console.log($('.gameArea'));
    lines.forEach(function (item) {
        item.y += player.speed * 3;
        item.style.top = item.y + 'px';
    })
    lines2.forEach(function (item) {
        item.y += player.speed * 3;
        item.style.top = item.y + 'px';
    })
}

function randomIndex() {
    let index = []
    while (true) {
        const random = Math.floor(Math.random() * 6)
        if (!index.includes(random)) index.push(random);
        if (index.length === 3) break;
    }
    return index
}

// Function which moves enemy cars
function enemyCars(car) {
    let ele = document.querySelectorAll(".enemy");
    let flag = true
    
    ele.forEach(function (item) {
        if (item.y >= 1500) {
            item.y = item.y - 600;
            item.style.left = Math.floor(Math.random() * 300) + "px";
        }
    })
    if (flag) {
        for (let i = 0; i < ele.length; i++) {
            let z = ele[i].y + 100;
            ele[i].style.top = z + "px";
            if (isCollide(car, ele[i])) {
                lifeCounter++
                clearInterval(setEnemy)
                $(".audio-btn").removeClass("clicked")
                let crash;
                flag = false
                if (ele[i].getAttribute("id") == enemy_audio.getAttribute("data-ans")) {
                    counter++
                    console.log(counter);
                    winFlag = true
                    scoreCounter()
                    $(crash).attr('src', './audio/correct.mp3')
                    $(crash).attr('data-audioSrc', './audio/correct.mp3')
                } else {
                    winFlag = false
                }
                if (lifeCounter < 3) {
                    start();
                    player.speed = 5
                } else if (lifeCounter >= 3) {
                    $(".audio-btn").css("pointer-events", "none")
                    $('.enemy').remove()
                    clearInterval(myInterval)
                    clearInterval(setEnemy)
                    winning()
                    endGame()
                    // fnReloadAll()
                    return
                }
                fnAudio(crash)
                if (counter < 3) {
                    endGame();
                    start();
                    player.speed = 5
                    endGameStyles()
                }
                return
            }
        }
    }
}

//Function which checks the collision detection 
function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    // console.log(aRect);
    // console.log(bRect);
    return !(
        (aRect.top > bRect.bottom) ||
        (aRect.bottom < bRect.top) ||
        (aRect.left > bRect.right) ||
        (aRect.right < bRect.left)
    )
}

//function which ends the game play and displays the score
function endGame() {
    player.start = false;
    endGameStyles();
}

function winning() {
    console.log($('.enemy'));
    $('.card').html('WELL DONE, Score: ' + counter)
    $('.winning').css('display', 'flex')
}
//function which displays the score and restarts the gameplay
function endGameStyles() {
    end.classList.remove('hide');
    if (winFlag) {
        end.classList.add('gameOver2')
        end.classList.remove('gameOver')
        end.innerHTML = 'WELL DONE' + "<br>" + "your score : " + counter;
    } else {
        end.classList.add('gameOver')
        end.classList.remove('gameOver2')
        end.innerHTML = 'WRONG CHOICE' + "<br>" + "your score : " + counter;
    }
}

//function which return the random colors
function randomColors() {
    function color() {
        let c = Math.floor(Math.random() * 256);
        return c;
    }
    return "rgb(" + color() + "," + color() + "," + color() + ")";
}

function fnReloadAll() {
    lifeCounter = 0;
    $('.winning').css('display', 'none')
    soundTrack = []
    player.score = 30
    counter = 0
    player.start = false
    scoreCounter()
    $(".gameStart").removeClass("hide")
    $(".end").addClass("hide")
    $(".audio-btn").removeClass("clicked")
    $(".audio-btn").css("pointer-events", "auto")
    $('.gameArea').html("")
    clearInterval(myInterval)
    clearInterval(setEnemy)
    clearInterval()
    $('#myCarousel').carousel(0)
    stopAudio()
    fnTemplate3_v1($('div.active'))
}