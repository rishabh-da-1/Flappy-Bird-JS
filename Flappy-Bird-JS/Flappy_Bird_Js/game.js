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

        
        // this.#utils();

        this.pipe_arr = [];
        this.#genPipe();
        this.brain = new Neural_Networks(3,4,1);
    }

    #AutoPilot(){

        let delta_x = this.pipe_arr[this.score].pipe_down.x-this.bird.x;
        let delta_y1 = this.bird.y - this.pipe_arr[this.score].pipe_down.y; 
        let delta_y2 = this.bird.y - (this.pipe_arr[this.score].pipe_up.y + this.pipe_arr[this.score].pipe_up.height);

        let inputs = [delta_x , delta_y1 , delta_y2];
        
        let output = this.brain.FeedForward(inputs);
        
        if(this.bird.control.cmd == true){
            console.log(inputs);
            output.print();
        }

        if(output.data[0][0] > 0.31){
            
            this.bird.control.flap = true;
            
        }
        else{
            this.bird.control.flap = false;
        }
       
        
    }

    render() {
        this.#AutoPilot();
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

    #utils(){
        let b1 = document.getElementById("b1");
        b1.addEventListener("click", function(){
            console.log("click");
        });
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
