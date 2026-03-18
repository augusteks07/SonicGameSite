// variáveis
let gameon = false
let gameover = false
let sonic = document.querySelector(".sonic")
let crabmeat = document.querySelector(".crabmeat")
let gameovertitle = document.querySelector(".gameover")
let start = document.querySelector(".start")
let restart = document.querySelector(".restart")
let score = 0
let eggman = document.querySelector(".eggman")
let eggball = document.querySelector(".eggBall")
let eggcorda = document.querySelector(".eggCorda")
let dashImg = document.querySelector(".dash")
let isDashing = false

let fire = document.querySelectorAll(".fire")

let greenhillsong = document.getElementById("basesong")
let songs = document.querySelectorAll(".song")
let ggsong = document.getElementById("gameoversong")
let bossfightsong = document.getElementById("bossfightsong")
let supersong = document.getElementById("supersong")

const leftBtn = document.getElementById("leftBtn")
const rightBtn = document.getElementById("rightBtn")
const jumpBtn = document.getElementById("jumpBtn")

// Bloqueia scroll na tela enquanto toca nos controles
document.addEventListener("touchmove", e => e.preventDefault(), { passive: false })


function desligarSons() {
    songs.forEach(s => {
        s.pause()
    })
}

fire.forEach(f => {
    f.style.display = "none"
})

let limiteDireita

//começar jogo!
function comecarjogo() {

    gameon = true
    score = 0

    desligarSons()
    greenhillsong.play()

    sonic.src = "./essenciais/sonic-running.gif"

    start.style.transform = "translatey(-150px)"

    crabmeat.classList.add("walk")

    document.querySelectorAll(".tip").forEach(i => {
        i.style.display = "none"
    })
}

// função pulo
function jump() {
    if (!sonic.classList.contains('jump') && gameover == false && gameon == true && finalBom) {

        sonic.classList.add("jump")

        setTimeout(() => {
            if (gameover == false) {

                score = score + 1

                if (score == 1) {
                    bossFight()
                }

                if (!isBossFight) {
                    document.getElementById("score").innerHTML = ("Score: " + score)
                }

                sonic.classList.remove("jump")
            }
        }, 1400)
    }
}

function enableHitboxes() {

    if (getComputedStyle(sonic).borderWidth == "0px") {

        sonic.style.border = "0.5px solid white"
        crabmeat.style.border = "0.5px solid white"
        eggman.style.border = "0.5px solid white"
        eggball.style.border = "0.5px solid white"

    } else {
        sonic.style.border = "0px solid white"
        crabmeat.style.border = "0px solid white"
        eggman.style.border = "0px solid white"
        eggball.style.border = "0px solid white"
    }


}

// verificação infinita
const loop = setInterval(() => {

    if (!isDashing) {
        dashImg.style.bottom = window.getComputedStyle(sonic).bottom
        dashImg.style.left = sonic.offsetLeft + "px"
    }

    if(movingLeft && !isDashing) {
        dashImg.style.transform = "scaleX(-1)"
    } else if (movingRight && !isDashing) {
        dashImg.style.transform = "scaleX(1)"
    }

    if (gameon == true) {

        limiteDireita = document.querySelector('.container').clientWidth - sonic.offsetWidth;
        let crabposition = crabmeat.offsetLeft
        let sonicposition = +window.getComputedStyle(sonic).bottom.replace("px", "")

        // gameover
        if (colidiu(sonic, crabmeat) || (colidiu(sonic, eggball) && isBossFight) && gameover == false) {

            sonic.classList.remove('jump')

            gameon = false
            gameover = true
            desligarSons()
            ggsong.play()
            crabmeat.classList.remove("walk")
            crabmeat.style.left = `${crabposition}px`

            sonic.style.bottom = `${sonicposition}px`
            sonic.src = "./essenciais/gameover.png"
            sonic.classList.add("ascend")

            gameovertitle.style.display = "block"

            isBossFight = false

            setTimeout(() => {

                restart.style.display = "block"
                sonic.style.display = "none"

            }, 2000)

        }

    }

    if (colidiu(sonic, eggman) && isBossFight && podeLevarDano) {
        eggman.style.filter = "brightness(4)"
        podeLevarDano = false
        contadorDeDano++
        score++
        document.getElementById("score").innerHTML = ("Score: " + score)

        if (contadorDeDano == 8) {
            fire.forEach(f => {
                f.style.display = "inline"
            })
        }

        if (contadorDeDano == 12) {
            finalBom()
        }

        setTimeout(() => {
            eggman.style.filter = ""
            podeLevarDano = true
        }, 500);
    }

    if (movingLeft && sonic.offsetLeft >= velocidade && isBossFight) {
        sonic.style.left = sonic.offsetLeft - velocidade + "px"
    }

    if (movingRight && sonic.offsetLeft < limiteDireita && isBossFight) {
        sonic.style.left = sonic.offsetLeft + velocidade + "px"
    }

}, 16);

let direcao;

document.addEventListener("keydown", (event) => {
    if ((event.key === "ArrowLeft" || event.key === "a") && isBossFight) {
        sonic.src = "./essenciais/sonic-running.gif"
        sonic.style.transform = "scalex(-1)"
        movingLeft = true
        direcao = "esquerda"
    }
    if ((event.key === "ArrowRight" || event.key === "d") && isBossFight) {
        sonic.src = "./essenciais/sonic-running.gif"
        sonic.style.transform = "scalex(1)"
        movingRight = true
        direcao = "direita"
    }
    if ((event.key === "ArrowUp" || event.key == "w") && gameon) {
        jump()
    }
    if (event.key === "q" && gameon) {
        dash()
    }
})

document.addEventListener("keyup", (event) => {
    if ((event.key === "ArrowLeft" || event.key === "a") && isBossFight) {
        movingLeft = false
        sonic.src = "./essenciais/sonic-parado.png"
    }
    if ((event.key === "ArrowRight" || event.key === "d") && isBossFight) {
        movingRight = false
        sonic.src = "./essenciais/sonic-parado.png"
    }
})


leftBtn.addEventListener("touchstart", () => {
    if (isBossFight) {
        sonic.src = "./essenciais/sonic-running.gif"
        sonic.style.transform = "scaleX(-1)"
        movingLeft = true
    }
})

leftBtn.addEventListener("touchend", () => {
    if (isBossFight) {
        movingLeft = false
        sonic.src = "./essenciais/sonic-parado.png"
    }

})

rightBtn.addEventListener("touchstart", () => {
    if (isBossFight) {
        sonic.src = "./essenciais/sonic-running.gif"
        sonic.style.transform = "scaleX(1)"
        movingRight = true
    }
})

rightBtn.addEventListener("touchend", () => {
    if (isBossFight) {
        movingRight = false
        sonic.src = "./essenciais/sonic-parado.png"
    }

})

jumpBtn.addEventListener("touchstart", () => {
    if (gameon) { jump() }
})


let virado = 1

eggman.addEventListener("animationiteration", (event) => {

    if (event.animationName === "eggMoves") {

        if (virado % 2 == 0) {
            eggman.style.backgroundImage = "url(./essenciais/eggManVirado.webp)"
        } else {
            eggman.style.backgroundImage = "url(./essenciais/eggMan.webp)"
        }
        virado += 1

    }


})

let isBossFight = false
let movingLeft = false
let movingRight = false
let podeLevarDano = true
let contadorDeDano = 0

function bossFight() {
    desligarSons()
    bossfightsong.play()
    crabmeat.style.display = "none"
    sonic.style.left = "50%"
    sonic.style.transform = "translatex(-50%)"
    sonic.style.transition = "1.5s"
    setTimeout(() => {
        isBossFight = true
        sonic.src = './essenciais/sonic-parado.png'
        sonic.style.transition = 'none'
        eggman.style.transition = "8s"
        eggman.style.left = "40px"
        eggman.style.transform = "translatex(-50%)"
        setTimeout(() => {
            eggman.classList.add("eggmoves")
            eggman.style.transition = "0s"
            eggman.style.backgroundImage = "url(./essenciais/eggManVirado.webp)"
        }, 7000);
    }, 1500);
}

function finalBom() {
    desligarSons()
    supersong.play()
    gameon = false
    isBossFight = false
    let finalBom = true
    eggman.style.filter = ""
    crabmeat.style.display = "none"

    document.querySelectorAll("*").forEach(el => {
        el.style.animationPlayState = "paused"
    })

    arvore = document.querySelector(".arvore")

    arvore.style.animationPlayState = "running"

    eggman.style.transition = "8s"

    eggman.style.transform = "translatex(100vw)"
    sonic.style.transform = "scaleX(1)"
    sonic.style.bottom = "120px"
    sonic.classList.remove("jump")
    eggcorda.style.transition = "1s"
    eggcorda.style.bottom = "-500px"
    sonic.src = "./essenciais/superSonic.gif"
    setTimeout(() => {
        sonic.style.transition = "1s"
        sonic.style.transform = "translatey(20px)"
        sonic.src = "./essenciais/SSvoador.gif"
        arvore.classList.add("walk")
        document.querySelector(".theend").style.display = "block"
    }, 1100);
}

function colidiu(a, b) {
    const A = a.getBoundingClientRect();
    const B = b.getBoundingClientRect();

    return (
        A.left < B.right &&
        A.right > B.left &&
        A.top < B.bottom &&
        A.bottom > B.top
    );
}

let velocidade = 6

function dash() {
    velocidade = 25
    sonic.src = "./essenciais/jump.png"
    isDashing = true

    dashImg.style.opacity = "1"

    setTimeout(() => {
        if (gameon) {
            velocidade = 6
            sonic.src = "./essenciais/sonic-running.gif"

            dashImg.style.opacity = "0"

            setTimeout(() => {
                isDashing = false
            }, 200);

        }
    }, 200);
}