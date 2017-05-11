class Fighter{
    constructor(name, job){
        this.job = job
        this.name = name
        this.experience = 0
        this.level = 1
        this.HPMax = 30
        this.HP = this.HPMax
        this.MPMax = 20
        this.MP = this.MPMax
        this.atk = 10
        this.def = 10
        this.atkM = 10
        this.defM = 10
        this.speed = 10
        this.crit = 5
        this.vulneFire = 0
        this.vulneIce = 0
        this.vulneThunder = 0
        this.weapon = null
        this.headgear = null
        this.bodygear = null
        this.accessory = null
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
}
