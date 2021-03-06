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
        this.inFight = false
        this.listJob = Array()
        this.listJob[0] = new Job("fighter", ["sword"], 4, 1.2, 1.2, 1,1,1)
        this.listJob[1] = new Job("black mage", ["scepter"], 3, 1, 1, 1, 1.2, 1.2)
        this.listJob[2] = new Job("white mage", ["rod"], 3, 1, 1, 1, 1.2, 1.2)
        this.listJob[3] = new Job("rogue", ["daggers"], 4, 1.2, 1, 1.2, 1, 1)
        this.listJob[4] = new Job("archer", ["bow"], 3, 1.4, 0.8, 1.2, 1, 1)
        this.listJob[5] = new Job("warrior", ["sword"], 4, 1, 1.2, 1, 1, 1.2)
        this.ennemis = Array()
        this.indexFighterCombat = 0
        this.listJobEnnemis = Array()
        this.listJobEnnemis.push(new Job("wolf", [], 3, 1,1,1.2,1,1))
        this.fighter = Array()
        this.fighter[0] = new Fighter("Monkey", this.listJob[4])
        this.fighter[1] = new Fighter("Knight", this.listJob[5])
        this.fighter[2] = new Fighter("Feca", this.listJob[1])
        this.fighter[3] = new Fighter("Iop", this.listJob[0])
        this.arrayFighters = Array()
        this.inventaire = Array()
        this.inventaire.push(new Equipment("beginner sword", "sword", null, 1, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner bow","bow", null, 5, 0, 0, 3, 0, 0, 0, 0, 6, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner rod", "rod", null, 1, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner scepter", "scepter", null, 1, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner helmet", "headgear", null, 0, 5, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner helmet", "headgear", null, 0, 5, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner helmet", "headgear", null, 0, 5, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner helmet", "headgear", null, 0, 5, 0, 0, 3, 0, 2, 0, 0, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner armor", "bodygear", null, 0, 5, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner armor", "bodygear", null, 0, 5, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner armor", "bodygear", null, 0, 5, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner armor", "bodygear", null, 0, 5, 0, 0, 2, 0, 3, 0, 0, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner ring", "accessory", null, 0, 10, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner ring", "accessory", null, 0, 10, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner ring", "accessory", null, 0, 10, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0))
        this.inventaire.push(new Equipment("beginner ring", "accessory", null, 0, 10, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0))

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
    getInventaireIndex(str){
        var a = 0
        $(this.inventaire).each(function(index, el) {
            if(el.name == str){
                a = index
            }
        });
        return a
    }
    generateEnnemies(){
        console.log("generateEnnemies");
        this.ennemis = Array()
        for (var i = 0; i < 4; i++) {
            this.ennemis.push(new Fighter("Ennemi " + i, this.listJobEnnemis[0], 9, 7-i, 15+Math.floor(5*Math.random()), 5+Math.floor(5*Math.random()), 5+Math.floor(5*Math.random()), 5+Math.floor(5*Math.random()), 5+Math.floor(5*Math.random()), 5+Math.floor(5*Math.random())))
        }
    }
    getInfosCombat(){//get fighter & ennemis if alive + sort by totalSpeed
        this.arrayFighters = Array()
        //ordre de jeu:
        for (var i = 0; i < this.ennemis.length; i++) {
            if(this.ennemis[i].HP > 0){
                this.arrayFighters.push(this.ennemis[i])
            }
        }
        for (var i = 0; i <this.fighter.length; i++) {
            if(this.fighter[i].HP > 0){
                this.arrayFighters.push(this.fighter[i])
            }
        }
        this.arrayFighters.sort(function(a,b) {return (a.getTotalSpeed() > b.getTotalSpeed()) ? 1 : ((b.getTotalSpeed() > a.getTotalSpeed()) ? -1 : 0)} )
        this.arrayFighters.reverse()
    }
    updateFighters(){//push data from this.arrayFighters to this.ennemi & this.fighter
        for (var i = 0; i < this.arrayFighters.length; i++) {
            for (var j = 0; j < this.ennemis.length; j++) {
                if(this.ennemis[j] == this.arrayFighters[i]){
                    this.ennemis[j] = this.arrayFighters[i]
                }
            }
            for (var j = 0; j < this.fighter.length; j++) {
                if(this.fighter[j] == this.arrayFighters[i]){
                    this.fighter[j] = this.arrayFighters[i]
                }
            }
        }
    }
    getUnit(x,y){
        var r = false
        $(this.arrayFighters).each(function(index, el) {
            if(el.x == x && el.y == y){
                r = el
            }
        });
        return r
    }
    endTurn(){
        if(this.indexFighterCombat < this.arrayFighters.length-1)
            this.indexFighterCombat++
        else
            this.indexFighterCombat=0
        this.arrayFighters[this.indexFighterCombat].addMP()
        for (var i = 0; i < this.ennemis.length; i++) {
            if(this.ennemis[i] == this.arrayFighters[this.indexFighterCombat]){
                this.arrayFighters[this.indexFighterCombat].beIntelligent(this.fighter, this)
                this.endTurn()
                // setTimeout(this.endTurn, 1000)
            }
        }
    }
    getWinner(){
        var allyDead = 0
        var ennemiDead = 0

        for (var i = 0; i < this.fighter.length; i++) {
            if(this.fighter[i].HP <= 0){
                allyDead++
            }
        }
        for (var i = 0; i < this.ennemis.length; i++) {
            if(this.ennemis[i].HP <= 0){
                ennemiDead++
            }
        }

        if(allyDead == this.fighter.length){
            return "defeat"
        }else if(ennemiDead == this.ennemis.length && this.ennemis.length>0){
            return "victory"
        }else return false
    }
}
