class Controls{
    constructor(){
        this.flap = false;
        this.restart = false;

        this.cmd = false ;
        
        this.#control();
    }

    #control(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowUp":
                    this.flap=true;
                    break;
                case "ArrowDown":
                    this.restart=true;
                    break;
                case "ArrowRight":
                   this.cmd = true;
                break;
            }
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                
                case "ArrowUp":
                    this.flap=false;
                    break;

                case "ArrowDown":
                    this.restart=false;
                    break;
                case "ArrowRight":
                    this.cmd = false;
                    break;
            }
        }
    }
}