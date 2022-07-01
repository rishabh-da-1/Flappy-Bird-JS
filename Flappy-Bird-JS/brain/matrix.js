class Matrix{
    constructor(row,col){
        this.row = row;
        this.col = col;
        this.data = [];

        for(let i = 0 ; i < this.row ; i++){
            this.data[i] = new Array(this.col);
            for (var j = 0; j < this.col; j++) {
                this.data[i][j] = 0;
              }
        }
    }

    random(){
        for(let i = 0 ; i < this.row ; i++){
            
            for (var j = 0; j < this.col; j++) {
                this.data[i][j] = Math.random()*2-1;              
            }
        }
    }
    add(m) {
        if (m instanceof Matrix) {
            m = m.data;
            for (let i = 0; i < this.row; i++) {
                for (let j = 0; j < this.col; j++) {

                    this.data[i][j] += m[i][j];
                }

            }

            return this.data;
        }
        else {
            for (let i = 0; i < this.row; i++) {
                for (let j = 0; j < this.col; j++) {
                    this.data[i][j] += m;

                }
            }
        }
    }
    static subtract(a,b){
        let result = new Matrix(a.row, a.col);
        if( a instanceof Matrix){
            if(b instanceof Matrix){
                for(let i = 0 ; i<result.row ; i ++){
                    for(let j = 0 ; j < result.col ; j ++){
                        result.data[i][j] = a.data[i][j]  - b.data[i][j];
                    }
                }
            }

            else{
                for(let i = 0 ; i<result.row ; i ++){
                    for(let j = 0 ; j < result.col ; j ++){
                        result.data[i][j] = a.data[i][j]  - b;
                    }
                }
            }
        }

        

        return result;
          
    }
    static transpose(m) {

        if (m instanceof Matrix) {

            let result = new Matrix(m.col, m.row);

            for (let i = 0; i < m.row; i++) {
                for (let j = 0; j < m.col; j++) {
                    result.data[j][i] = m.data[i][j];
                }
            }
            return result;
        } else {
            return undefined;
        }
    }

    static multiply(m1,m2){
        if(m1 instanceof Matrix){
            if(m2 instanceof Matrix){
                //matrix multiplication
                if(m1.col != m2.row){
                    console.log("column of input 1 must be equal to column of input 2");
                    return undefined;
                }else{
                    let result = new Matrix(m1.row,m2.col);
                    for(let i = 0 ; i < result.row ; i++){
                        let sum = 0;
                        for(let j = 0 ; j < result.col ; j++){
                            for (let k = 0; k < m1.col; k++) {
                                sum += m1.data[i][k] * m2.data[k][j];

                            }
                            result.data[i][j] = sum;
                        }
                    }
                    m1 = result;
                }
            
            }else{
                //scalar multiplication
                for (let i = 0; i < m1.row; i++) {
                    for (let j = 0; j < m1.col; j++) {
                        m1.data[j][i] *= m2;
                    }
                }   
            }
        }else{
            console.log("input 1 must be a matrix");
        }
        return m1;
    }

    
    map(fn) {
        var result = new Matrix(this.row, this.col);

        for (var i = 0; i < result.row; i++) {

            for (var j = 0; j < result.col; j++) {
                let val = this.data[i][j];
                result.data[i][j] = fn(val);

            }
        }
        return result;
    }

    static map(matrix,fn) {
        var result = new Matrix(matrix.row, matrix.col);

        for (var i = 0; i < result.row; i++) {

            for (var j = 0; j < result.col; j++) {
                let val = matrix.data[i][j];
                result.data[i][j] = fn(val);

            }
        }
        return result;
    }

    static fromArray(input){
        let m = new Matrix(input.length,1);
        
        for(let i=0;i<input.length;i++){
            m.data[i][0] = input[i];
        }
        return m;
    }

    toArray(){
        let arr = [];

        for (var i = 0; i < result.row; i++) {

            for (var j = 0; j < result.col; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }

    print(){
        if(this.row == 1 && this.col == 1){
            console.log(this.data[0][0])
        }else{
            console.log(this.data);
        }
    }
}
