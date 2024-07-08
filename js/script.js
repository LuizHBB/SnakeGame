const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//definindo tamanha padrão dos blocos
const size = 30

//posição inicial da cobra
const snake = [{ x: 270, y: 240 }]

//crinanddo um numero randomico usando paramentros desejaveis
const randomNumber = (min, max) =>{
    return Math.round(Math.random() * (max-min)+ min)
}

//função que vai ser atribuida a posição das comidas, sendo sempre multiplo de 30
const randomPosition = () => {
    const number = randomNumber(0,canvas.width - size)
    return Math.round(number / 30)*30
}

// caso queira usar food com cores diferentes - não quero
const randomColor = () =>{
    const red = randomNumber(0,255)
    const green = randomNumber(0,255)
    const blue = randomNumber(0,255)

    return `rgb(${red}, ${green}, ${blue})`
}

//posição teste e cor da comidinha
const food = {
    x:randomPosition(),
    y:randomPosition(),
    color: "red"
    //color: randomColor()
}

//variaveis globais
let direction, loopID

//desenha a comida da cobrinha dentro do mapa
const drawFood = () =>{
    const { x, y, color} = food
    ctx.shadowColor = color
    ctx.shadowBlur = 12
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

//função que faz a cobrinha se mover de acordo com as teclas pressionadas
const drawSnake = () => {
    ctx.fillStyle = "#008000"
    snake.forEach((position, index) => {
        if(index == snake.length-1){
            ctx.fillStyle = "#228b22"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })
}

//função para mover a cobrinha denho do cenario
const moveSnake = () => {
    if(!direction) return
    const head = snake[snake.length - 1]


    if(direction == "right"){
        snake.push({ x:head.x + size, y:head.y})
    }
    if(direction == "left"){
        snake.push({ x:head.x - size, y:head.y})
    }
    if(direction == "down"){
        snake.push({ x:head.x, y:head.y + size})
    }
    if(direction == "up"){
        snake.push({ x:head.x, y:head.y - size})
    }

    snake.shift()
}

//desenha as linhas dentro do jogo
const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#404040"

    for (let i = 30; i<canvas.width; i +=30) {
        ctx.beginPath()
        ctx.lineTo(i, 0)
        ctx.lineTo (i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo (600, i)
        ctx.stroke()
    }
    
}


//vai verificar se a cobra 'comeu' a comida e crescer o corpo
const checkEat = () =>{
    const head = snake[snake.length - 1]

    let x = randomNumber()
    let y = randomNumber()
    while(snake.find((position) => position.x == x && position.y == y)){
        x = randomNumber()
        y = randomNumber()
    }
    food.x = x
    food.y = y
}

//função que vai deixar o jogo em loop
const gameLoop = () => {
    clearInterval(loopID)
    ctx.clearRect(0,0,600,600)

    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    checkEat()

    loopID = setTimeout(()=>{
        gameLoop()
    }, 300)
}

gameLoop()


// Vai capturar as teclas para mover a cobrinha
document.addEventListener("keydown", ({ key }) =>{
    if (key == "ArrowRight" && direction !="left") {
        direction = "right"
    }
    if (key == "ArrowLeft" && direction !="right") {
        direction = "left"
    }
    if (key == "ArrowDown" && direction !="up") {
        direction = "down"
    }
    if (key == "ArrowUp" && direction !="down") {
        direction = "up"
    }
})