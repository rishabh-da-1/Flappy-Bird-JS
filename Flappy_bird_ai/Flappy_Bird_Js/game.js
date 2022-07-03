class Game {
    constructor() {
        this.TexBackground = new Image();
        this.TexGround = new Image();

        this.TexBackground.src = 'src/bg.png'
        this.TexGround.src = 'src/ground.png';

        this.ground_height = canvas.height - 40;

        this.bird = new Bird(this.ground_height - 40);
        this.P1 = new Pipe(this.ground_height, 1);

        // this.#utils();
        this.pipe_arr = [];
        this.#genPipe();
        this.bots = new Bot(this.ground_height,this.pipe_arr);
    
        //buttons
       

        this.game_over = false;
    }


    render() {
      
        this.#CollisionDetection();
        this.#background();
        
        this.bots.r_bots(this.pipe_arr,this.score);
        this.#score();


        

        for (let i = 0; i < 1000; i++) {
            let go = [];
            for(let i = 0 ; i <this.bots.bots.length; i++){
                go[i] = this.bots.bots[i].gameover;
            }
            this.pipe_arr[i].P_Render(go,this.bots.bots.length);
        }
    }

    #score() {
        for (let i = 0; i < 1000; i++) {
            for(let j = 0 ; j < this.bots.bots.length ; j++){
                if (this.pipe_arr[i].pipe_up.x == this.bots.bots[j].x - 60) {
                    this.bots.bots[j].score+=1;
                    
                }
            }
        }
        
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
           
           
            var plx = this.pipe_arr[i].pipe_down.x+10;
            var ply = this.pipe_arr[i].pipe_down.y+10;
            
            var pux = this.pipe_arr[i].pipe_up.x+10;
            var puy = this.pipe_arr[i].pipe_up.y+10;
            
            for(let i = 0 ; i < this.bots.bots.length ; i++){
                if(Distance(this.bots.bots[i].x,this.bots.bots[i].y,plx, ply , this.pipe_arr[i].pipe_down.height)){
                    this.bots.bots[i].gameover = true;
                }
                if(Distance(this.bots.bots[i].x,this.bots.bots[i].y,pux, puy , this.pipe_arr[i].pipe_up.height)){
                    this.bots.bots[i].gameover = true;
                }
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
