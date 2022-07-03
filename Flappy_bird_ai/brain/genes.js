class Bot{
    constructor(gh){
        this.bots = [];
        this.brains = [];
        
        this.ground_height = gh;
        this.amount = 120;

        for(let i = 0 ; i < this.amount ; i++){
            this.bots[i] = new Bird(i*30,this.ground_height - 40);
        }
        
        for(let i = 0 ; i < this.amount ; i++){
            this.brains[i] = new Neural_Network(3,4,1);
        }
        
    }

    r_bots(pipe_arr,score){
        for(let i = 0 ; i<this.bots.length;i++){
            this.bots[i].B_render();
        }
        this.#AutoPilot(pipe_arr,score);        
    }
    #AutoPilot(pipe_arr){
        
        for(let i = 0 ; i < this.bots.length ; i++){
            
            
            
            let delta_x = pipe_arr[this.bots[i].score].pipe_up.x-this.bots[i].x;
            let delta_y1 = this.bots[i].y - pipe_arr[this.bots[i].score].pipe_down.y; 
            let delta_y2 = this.bots[i].y - (pipe_arr[this.bots[i].score].pipe_up.y + pipe_arr[this.bots[i].score].pipe_up.height);

            let inputs = [delta_x , delta_y1 , delta_y2];
        
            let output = this.brains[i].FeedForward(inputs);


            if(output.data[0][0] > 0.31){
            
                this.bots[i].control.flap = true;
            
            }
            else{
                this.bots[i].control.flap = false;
            }
       
        }

        
    }

    B_selection(){
        
    }

    W_reset(){
        for(let i = 0 ; i < this.amount ; i++){
            this.brains[i].r_weights(this.weights_updated);
        }
    }
}