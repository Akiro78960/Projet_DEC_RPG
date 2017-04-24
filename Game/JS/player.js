class Player{
    constructor(){
        this.localX = 0
        this.localY = 0
        this.globalX=0
        this.globalY=0
        this.localSizeMax=12
        this.globalSizeMax=2
        this.strGlobalX="x"+this.globalX
        this.strGlobalY="y"+this.globalY
        this.gold = 0
        this.fighter = Array()
        this.fighter[0] = new Fighter("monkeyPlayer")
        this.fighter[1] = new Fighter("Knight")
        this.fighter[2] = new Fighter("Fighter3")
        this.fighter[3] = new Fighter("Fighter4")
        this.listJob = Array()
        this.listJob["fighter"] = new Job(["sword"], 4, 1.2, 1.2, 1,1,1)
        this.listJob["blackMage"] = new Job(["scepter"], 3, 1, 1, 1, 1.2, 1.2)
        this.listJob["whiteMage"] = new Job(["rod"], 3, 1, 1, 1, 1.2, 1.2)
        this.listJob["rogue"] = new Job(["daggers"], 4, 1.2, 1, 1.2, 1, 1)
        this.listJob["archer"] = new Job(["bow"], 3, 1.2, 1, 1.2, 1, 1)
    }
    updatePosition(){
        if(this.localY>=this.localSizeMax){
            this.localY=0
            this.globalY++
        }else if(this.localY<0){
            this.localY=this.localSizeMax-1
            this.globalY--
        }
        if(this.localX>=this.localSizeMax){
            this.localX=0
            this.globalX++
        }else if(this.localX<0){
            this.localX=this.localSizeMax-1
            this.globalX--
        }
        this.strGlobalX="x"+this.globalX
        this.strGlobalY="y"+this.globalY
    }

}
