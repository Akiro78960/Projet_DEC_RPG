class Player{
    constructor(){
        this.localX = 0
        this.localY = 0
        this.globalX=0
        this.globalY=0
        this.strGlobalX="x"+this.globalX
        this.strGlobalY="y"+this.globalY
    }
    updatePosition(){
        if(this.localY>=10){
            this.localY=0
            this.globalY++
        }else if(this.localY<0){
            this.localY=9
            this.globalY--
        }
        if(this.localX>=10){
            this.localX=0
            this.globalX++
        }else if(this.localX<0){
            this.localX=9
            this.globalX--
        }
        this.strGlobalX="x"+this.globalX
        this.strGlobalY="y"+this.globalY
    }

}
