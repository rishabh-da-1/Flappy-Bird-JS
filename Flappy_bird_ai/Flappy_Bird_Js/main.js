const canvas = document.getElementById("game-window")
const context = canvas.getContext('2d')

canvas.height = 560;
canvas.width = 300;

const game = new Game;

function Animate(){
    game.render();
    
    requestAnimationFrame(Animate);
    
}


let r_game = document.getElementById('b1');
let r_weight  = document.getElementById('b2');

r_game.addEventListener('click' ,function(){
    for (let i = 0; i < 1000; i++) {
        game.pipe_arr[i].P_Reset();
    }
    for(let j = 0 ; j < game.bots.bots.length ; j++){
        game.bots.bots[j].B_Reset();
    }
    
})


r_weight.addEventListener('click' ,function(){
    game.bots.W_reset();
    for (let i = 0; i < 1000; i++) {
        game.pipe_arr[i].P_Reset();
    }
    for(let j = 0 ; j < game.bots.bots.length ; j++){
        game.bots.bots[j].B_Reset();
    }
})



Animate()
