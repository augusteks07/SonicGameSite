        // variáveis
        let gameon = false
        let gameover = false
        let sonic = document.querySelector(".sonic")
        let crabmeat = document.querySelector(".crabmeat")
        let gameovertitle = document.querySelector(".gameover")
        let start = document.querySelector(".start")
        let restart = document.querySelector(".restart")
        let greenhillsong = document.getElementById("xaxa")
        let ggsong = document.getElementById("xoxo")

        //começar jogo!
        function comecarjogo(){

            restart.style.display = "none"
            gameovertitle.style.display = "none"
            gameover = false
            gameon = true

            ggsong.currentTime = 0
            ggsong.pause()
            greenhillsong.currentTime = 0
            greenhillsong.play()

            sonic.style.left = "0"
            sonic.style.bottom = "0"
            sonic.style.display = "block"
            sonic.src = "./essenciais/sonic-running.gif"
            sonic.classList.remove("jump", "ascend")

            crabmeat.style.left = "100%"
            crabmeat.classList.remove("walk")
            void crabmeat.offsetWidth;
            crabmeat.classList.add("walk")

            document.getElementById("xaxa").play()

            start.style.transform = "translatey(-150px)"


            crabmeat.classList.add("walk")
        }

        // função pulo
        function jump() {
            if(!sonic.classList.contains('jump') && gameover == false && gameon == true){
                
                sonic.classList.add("jump")
                sonic.src = "./essenciais/jump.png"
                sonic.style.width = "80px"

                setTimeout(() => {
                    if(gameover == false){
                        sonic.classList.remove("jump")
                        sonic.style.width = "70px"
                        sonic.src = "./essenciais/sonic-running.gif"
                    }
                },1200)
            }
        }
    
        // verificação infinita
        const loop = setInterval(() => {

            if(gameon == true){

                let crabposition = crabmeat.offsetLeft
                let sonicposition = +window.getComputedStyle(sonic).bottom.replace("px", "")

                // gameover
                if(crabposition <= 70 && crabposition >= 0 && sonicposition <= 60 && gameover == false){
                    

                    gameon = false
                    gameover = true
                    greenhillsong.pause()

                    ggsong.currentTime = 0
                    ggsong.play()

                    crabmeat.classList.remove("walk")
                    crabmeat.style.left = `${crabposition}px`

                    sonic.style.bottom = `${sonicposition}px`
                    sonic.src = "./essenciais/gameover.png"
                    sonic.classList.add("ascend")
                    
                    gameovertitle.style.display = "block"
                    
                    setTimeout(() => {
                        
                        restart.style.display = "block"
                        sonic.style.display = "none"
                    
                    },2000)

                }
            
            }

        }, 100);

        document.addEventListener('keydown', jump)