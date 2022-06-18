const canvas = document.getElementById("game-window")
const context = canvas.getContext('2d')

canvas.height = 560;
canvas.width = 300;

const game = new Game;

function Animate(){
    game.render();
    requestAnimationFrame(Animate);
    
}


Animate()
