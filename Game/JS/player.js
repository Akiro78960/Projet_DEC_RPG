class Player{
    constructor(){
        this.localX = 0
        this.localY = 0
        this.globalX=0
        this.globalY=0
        this.strGlobalX="x"+this.globalX
        this.strGlobalY="y"+this.globalY
        this.gold = 0
        this.fighter = Array()
        this.fighter[0] = new Fighter("monkeyPlayer")
        this.fighter[1] = new Fighter("Knight")
        this.fighter[2] = new Fighter("Fighter3")
        this.fighter[3] = new Fighter("Fighter 4")
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
