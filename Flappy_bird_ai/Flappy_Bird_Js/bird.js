
class Bird{
    constructor(pos,g_height){
        this.x = 100;
        this.y = pos;

        this.pos = pos;
        
        this.velocity = 0;
        this.ground_height = g_height;

        //texture
        this.BirdTex = new Image();
        this.BirdTex.src = "./src/bird.png";

        this.gravity = 3;
        this.speed = 4;
        this.control = new Controls("DUMMY");

        this.gameover = false;
        this.score = 0;
        

    }

    

    B_render(){
        if(this.gameover == false){
            //context.clearRect(0,0,canvas.width,canvas.height)
            context.save();
            context.translate(this.x,this.y)
            //rotation
            if(this.velocity < 0){
                context.rotate(-25 * Math.PI / 360)
            }
            else if(this.velocity ==this.gravity){
                context.rotate(20 * Math.PI / 360)

            }
            //context.drawImage(this.BirdTex,this.x,this.y,44,34);
            context.drawImage(this.BirdTex,20-50/2,0-50/2,44,34);
            context.restore()
        
            if(this.#B_movement() == true){
                return true;
            }
        }

        
    }

    B_Reset(){
        this.gameover = false;
        this.x = 20;
        this.y = this.pos;
    }

    #B_movement(){
        
        if(this.y < this.ground_height + 27){
            this.y += this.gravity;
            
        }
        if(this.y >= this.ground_height + 26){
            this.gameover = true;
            return true;
        }
        if(this.y <= 5){
            this.gameover = true;
            return true;
        }

        if(this.control.flap == true){
            if(this.velocity > -4){
                this.velocity -= this.speed*2;
            }

        }else{
            this.velocity = 0;
        }


        
        if(this.y > 0 ){
            this.y += this.velocity;
        }
    }
}