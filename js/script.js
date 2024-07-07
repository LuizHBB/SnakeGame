const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//definindo tamanha padrão dos blocos
const size = 30

//posição inicial da cobra
const snake = [
    { x: 270, y: 240}
]

//posição teste e cor da comidinha
const food = {
    x:90,
    y:90,
    color: "red"
}

//variaveis globais
let direction, loopID

//desenha a comida da cobrinha dentro do mapa
const drawFood = () =>{
    ctx.fillStyle = food.color
    ctx.fillRect(food.x, food.y, size, size)
}

//função que faz a cobrinha se mover de acordo com as teclas pressionadas
const drawSnake = () => {
    ctx.fillStyle = "purple"
    snake.forEach((position, index) => {
        if(index == snake.length-1){
            ctx.fillStyle = "pink"
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
    ctx.strokeStyle = "white"

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

//função que vai deixar o jogo em loop
const gameLoop = () => {
    clearInterval(loopID)
    ctx.clearRect(0,0,600,600)

    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()

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