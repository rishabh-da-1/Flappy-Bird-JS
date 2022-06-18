class Game {
    constructor() {
        this.TexBackground = new Image();
        this.TexGround = new Image();

        this.TexBackground.src = 'src/bg.png'
        this.TexGround.src = 'src/ground.png';

        this.ground_height = canvas.height - 40;

        this.bird = new Bird(this.ground_height - 40);
        this.P1 = new Pipe(this.ground_height, 1);

        this.game_over = false;
        this.score = 0;

        this.pipe_arr = [];
        this.#genPipe();
    }

    render() {
        this.#CollisionDetection();
        this.#background();
        this.#score();

        if (this.bird.B_render() == true) {
            this.game_over = true;
        }

        if (this.game_over == true) {
            if (this.bird.control.restart == true) {
                this.#gameOverEvent();
            }
        }

        for (let i = 0; i < 1000; i++) {
            this.pipe_arr[i].P_Render(this.game_over);
        }
    }

    #score() {
        for (let i = 0; i < 1000; i++) {
            if (this.pipe_arr[i].pipe_up.x == this.bird.x - 60) {
                this.score++;
                console.log(this.score)
            }
        }

        context.beginPath();
        context.font = "Arial 100px";
        context.fillText(`Score : ${this.score}`,canvas.width/2 - 15,canvas.height - 20)

    }


    #gameOverEvent() {
        for (let i = 0; i < 1000; i++) {
            this.pipe_arr[i].P_Reset();
        }

        this.bird.B_Reset();
        this.score = 0;
        this.game_over = false;

    }

    #genPipe() {

        for (let i = 0; i < 1000; i++) {
            this.pipe_arr[i] = new Pipe(this.ground_height, i + 1);
        }
    }

    #background() {
        //background
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.beginPath();
        context.drawImage(this.TexBackground, 0, 0, canvas.width, canvas.height)

        //ground

        context.drawImage(this.TexGround, 0, this.ground_height, canvas.width, 60);
    }


    #CollisionDetection(){
        for (let i = 0; i < this.pipe_arr.length; i++) {
           
           
            var plx = this.pipe_arr[i].pipe_down.x;
            var ply = this.pipe_arr[i].pipe_down.y;
            
            var pux = this.pipe_arr[i].pipe_up.x;
            var puy = this.pipe_arr[i].pipe_up.y;
            

            if(Distance(this.bird.x,this.bird.y,plx, ply , this.pipe_arr[i].pipe_down.height)){
                this.game_over = true ;
            }
            if(Distance(this.bird.x,this.bird.y,pux, puy , this.pipe_arr[i].pipe_up.height)){
                this.game_over = true ;
            }
            

        }
    }



}

function Distance(Bx,By,Px,Py,PH){
    if(
        Bx + 25 >= Px &&
        Bx <= Px + 80 &&
        By  >= Py&&
        By <= Py + PH

    ){
        return true;
    }
} 
