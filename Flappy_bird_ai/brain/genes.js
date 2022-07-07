class Bot{
    constructor(gh){
        this.bots = [];
        this.brains = [];
        
        this.ground_height = gh;
        this.amount = 2;
        this.count = 0;

        this.commands = new Controls("NOTDUMMY");

        for(let i = 0 ; i < this.amount ; i++){
            this.bots[i] = new Bird(i*30,this.ground_height - 40);
        }
        
        for(let i = 0 ; i < this.amount ; i++){
            this.brains[i] = new Neural_Network(3,4,1);
        }
        
                

        //console.log(this.brains[69].weights)
        this.all_GameOver = false;
    }

    r_bots(pipe_arr,score){
        for(let i = 0 ; i<this.bots.length;i++){
            this.bots[i].B_render();
        }
        
        // this.B_selection()
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
        let s_weights_ih = [];
        let s_weights_ho = [];
        
     

        for(let i = 0 ; i < this.amount-1 ; i++){
            if(this.bots[i].score > 1){
                //pushing weights to array ;
            
                for(let row = 0 ; row < this.brains[i].weights_IH.row ; row++){
                    for(let col = 0 ; col < this.brains[i].weights_IH.col ; col++){
                        
                        s_weights_ih.push(this.brains[i].weights_IH.data[row][col]);
                    }
                }


                for(let row = 0 ; row < this.brains[i].weights_HO.row ; row++){
                    for(let col = 0 ; col < this.brains[i].weights_HO.col ; col++){
                        s_weights_ho.push(this.brains[i].weights_HO.data[row][col]);
                    }
                }
            }
            
        }    
        for(let i = 0 ; i < this.amount ; i++){
            this.brains[i].adj_weights(s_weights_ih,s_weights_ho);
           
        }
        console.log(s_weights_ho);
        console.log(s_weights_ih);
        
    }

    
}