class Pipe{
    constructor(ground_height,pipe_count){
        this.base_height = ground_height;

        this.origin = 200 * pipe_count;
    
        this.pipe_up = {height:200,x:200*pipe_count,y:0};
        this.pipe_down = {height:200,x:200*pipe_count,y:this.base_height};
    
        this.Tex_up = new Image();
        this.Tex_down = new Image();
    
        this.Tex_up.src = "./src/pipe2.png";
        this.Tex_down.src = "./src/pipe.png";

        this.P_Init();
    }

    P_Init(){
        //random height to pipe down
        this.pipe_down.height = Math.random() *280 + 100;
        //auto set pipe down height
        this.pipe_down.y -= this.pipe_down.height;

        this.pipe_up.height = (this.base_height - this.pipe_down.height) - 90;
        //pipe up height    
    }
    
    P_Reset(){
        this.pipe_up.x = this.origin;
        this.pipe_down.x = this.origin;
    }

    P_Render(game_over,len){
        
        context.beginPath();
        context.drawImage(this.Tex_down , this.pipe_down.x , this.pipe_down.y , 80,this.pipe_down.height);

    

        context.beginPath();
        context.drawImage(this.Tex_up, this.pipe_up.x , this.pipe_up.y , 80,this.pipe_up.height);
        
        this.P_Move(game_over);
    }


    P_Move(game_over){
        let g =0;
        for(let i = 0 ; i < game_over.length;i++){
            if(game_over[i] == false){
                g=false;
            }
            
        }

        if(g==false){
            
            this.pipe_up.x --;
            this.pipe_down.x --;
        }
        
        
    }
}