class Fighter{
    constructor(name, job, x, y, HPMax, atk, def, atkM, defM, speed){
        this.job = job
        this.name = name
        this.x = x || 0
        this.y = y || 0
        this.experience = 0
        this.level = 1
        this.HPMax = HPMax || 30
        this.HP = this.HPMax
        this.MPMax = 25
        this.MP = 0
        this.atk = atk || 10
        this.def = def || 10
        this.atkM = atkM || 10
        this.defM = defM || 10
        this.speed = speed || 10
        this.crit = 5
        this.vulneFire = 0
        this.vulneIce = 0
        this.vulneThunder = 0
        this.weapon = null
        this.headgear = null
        this.bodygear = null
        this.compteur = 0
        this.accessory = null
        this.dammageDisplay = new DammageDisplay(0, this.x, this.y)
    }
    addMP(){
        if(this.MP-10 <= this.MPMax ){
            this.MP =+ 10
        }else{
            this.MP = this.MPMax
        }
    }
    isAccessible(x,y, range){
        var diffx = Math.abs(x-this.x)
        var diffy = Math.abs(y-this.y)
        if(diffx + diffy > range){
            return false
        }else{
            return true
        }
    }
    attack(target){
        console.log(Math.floor(this.getTotalAtk()*this.getTotalAtk()/(this.getTotalAtk()+target.getTotalDef())));
        target.HP -= Math.floor(this.getTotalAtk()*this.getTotalAtk()/(this.getTotalAtk()+target.getTotalDef()))
        return Math.floor(this.getTotalAtk()*this.getTotalAtk()/(this.getTotalAtk()+target.getTotalDef()))
    }
    getTotalAtk(){
        var tmp = 0
        tmp += this.atk
        if(this.weapon){
            tmp += this.weapon.bonusAtk
        }
        if (this.headgear) {
            tmp += this.headgear.bonusAtk
        }
        if (this.bodygear) {
            tmp += this.bodygear.bonusAtk
        }
        if(this.accessory){
            tmp += this.accessory.bonusAtk
        }
        return tmp*this.job.atkMultiplier
    }
    getTotalDef(){
        var tmp = 0
        tmp += this.def
        if(this.weapon){
            tmp += this.weapon.bonusDef
        }
        if (this.headgear) {
            tmp += this.headgear.bonusDef
        }
        if (this.bodygear) {
            tmp += this.bodygear.bonusDef
        }
        if(this.accessory){
            tmp += this.accessory.bonusDef
        }
        return tmp*this.job.defMultiplier
    }
    getTotalAtkM(){
        var tmp = 0
        tmp += this.atkM
        if(this.weapon){
            tmp += this.weapon.bonusAtkM
        }
        if (this.headgear) {
            tmp += this.headgear.bonusAtkM
        }
        if (this.bodygear) {
            tmp += this.bodygear.bonusAtkM
        }
        if(this.accessory){
            tmp += this.accessory.bonusAtkM
        }
        return tmp*this.job.atkMMultiplier
    }
    getTotalDefM(){
        var tmp = 0
        tmp += this.defM
        if(this.weapon){
            tmp += this.weapon.bonusDefM
        }
        if (this.headgear) {
            tmp += this.headgear.bonusDefM
        }
        if (this.bodygear) {
            tmp += this.bodygear.bonusDefM
        }
        if(this.accessory){
            tmp += this.accessory.bonusDefM
        }
        return tmp*this.job.defMMultiplier
    }
    getTotalSpeed(){
        var tmp = 0
        tmp += this.speed
        if(this.weapon){
            tmp += this.weapon.bonusSpeed
        }
        if (this.headgear) {
            tmp += this.headgear.bonusSpeed
        }
        if (this.bodygear) {
            tmp += this.bodygear.bonusSpeed
        }
        if(this.accessory){
            tmp += this.accessory.bonusSpeed
        }
        return tmp*this.job.speedMultiplier
    }
    tick(){
        this.compteur++
    }
    getAttackRange(){
        var tmp = 1
        if(this.weapon)
            tmp = this.weapon.range
        return tmp
    }
    beIntelligent(arrayAlly, player){
        console.log("intelligent");
        var attacked = false
        var moved = false
        var distanceMin = 420
        var indexMin = null
        var indexAllySorted = arrayAlly
        var stepLeft = this.job.mobility

        for(var i = 0; i<arrayAlly.length; i++){
            if(this.getDistanceTo(arrayAlly[i].x, arrayAlly[i].y) < distanceMin && arrayAlly[i].HP>0){
                distanceMin = this.getDistanceTo(arrayAlly[i].x, arrayAlly[i].y)
                indexMin = i
                console.log();
            }
        }
        console.log(arrayAlly[indexMin]);//display Ally plus proche de this

        // verif si a cote de qqun
        for(var i = 0; i<arrayAlly.length; i++){
            if(arrayAlly[i].HP>0 && ((Math.abs(arrayAlly[i].x - this.x) == 1 && arrayAlly[i].y==this.y) || (Math.abs(arrayAlly[i].y - this.y) == 1 && arrayAlly[i].x==this.x))){
                stepLeft = 0
            }
        }


        while(this.getDistanceTo(arrayAlly[indexMin].x,arrayAlly[indexMin].y) >1 && stepLeft>0){
            if(this.x > arrayAlly[indexMin].x && !player.getUnit(this.x-1, this.y)){
                this.x--
                stepLeft--
            }else if(this.y > arrayAlly[indexMin].y && !player.getUnit(this.x, this.y-1)){
                this.y--
                stepLeft--
            }else if(this.x < arrayAlly[indexMin].x && !player.getUnit(this.x+1, this.y)){
                this.x ++
                stepLeft --
            }else if(this.y < arrayAlly[indexMin].y && !player.getUnit(this.x, this.y+1)){
                this.y++
                stepLeft--
            }else{
                stepLeft=0
            }
            //si qqun a cote, stop
            for(var i = 0; i<arrayAlly.length; i++){
                if(((Math.abs(arrayAlly[i].x - this.x) == 1 && arrayAlly[i].y==this.y) || (Math.abs(arrayAlly[i].y - this.y) == 1 && arrayAlly[i].x==this.x))){
                    stepLeft = 0
                }
            }
        }

        for(var i = 0; i<arrayAlly.length; i++){
            if(!attacked && arrayAlly[i].HP>0 && ((Math.abs(arrayAlly[i].x - this.x) == 1 && arrayAlly[i].y==this.y) || (Math.abs(arrayAlly[i].y - this.y) == 1 && arrayAlly[i].x==this.x))){
                console.log("target: " + arrayAlly[i].name);
                this.attack(arrayAlly[i])
                this.dammageDisplay.compteur = 0
                this.dammageDisplay.str = -Math.floor(this.getTotalAtk()*this.getTotalAtk()/(this.getTotalAtk()+arrayAlly[i].getTotalDef()))
                this.dammageDisplay.x = arrayAlly[i].x
                this.dammageDisplay.y = arrayAlly[i].y
                attacked = true
            }
            else if(!moved && !((Math.abs(arrayAlly[i].x - this.x) == 1 && arrayAlly[i].y==this.y) || (Math.abs(arrayAlly[i].y - this.y) == 1 && arrayAlly[i].x==this.x))){
                moved = true;
            }
        }
    }
    getDistanceTo(x,y){
        return Math.abs(x - this.x) + Math.abs(y - this.y)
    }
}
