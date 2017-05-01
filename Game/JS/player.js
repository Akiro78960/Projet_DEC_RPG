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
        this.listJob = Array()
        this.listJob[0] = new Job("fighter", ["sword"], 4, 1.2, 1.2, 1,1,1)
        this.listJob[1] = new Job("black mage", ["scepter"], 3, 1, 1, 1, 1.2, 1.2)
        this.listJob[2] = new Job("white mage", ["rod"], 3, 1, 1, 1, 1.2, 1.2)
        this.listJob[3] = new Job("rogue", ["daggers"], 4, 1.2, 1, 1.2, 1, 1)
        this.listJob[4] = new Job("archer", ["bow"], 3, 1.2, 1, 1.2, 1, 1)
        this.listJob[5] = new Job("warior", ["shield"], 4, 1, 1.2, 1, 1, 1.2)
        this.fighter = Array()
        this.fighter[0] = new Fighter("monkeyPlayer", this.listJob[2])
        this.fighter[1] = new Fighter("Knight", this.listJob[5])
        this.fighter[2] = new Fighter("Fighter3", this.listJob[1])
        this.fighter[3] = new Fighter("Fighter4", this.listJob[0])
        this.inventaire = Array()
        this.inventaire.push(new Equipment("beginner sword1", "sword", null, 1, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner sword2", "sword", null, 1, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner sword3", "sword", null, 1, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner sword4", "sword", null, 1, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner sword5", "sword", null, 1, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner sword6", "sword", null, 1, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0))
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
