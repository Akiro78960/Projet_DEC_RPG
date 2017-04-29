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
            tmp += weapon.atk
        }
        if (this.headgear) {
            tmp += headgear.atk
        }
        if (this.bodygear) {
            tmp += bodygear.atk
        }
        if(this.accessory){
            tmp += accessory.atk
        }
        return tmp*this.job.atkMultiplier
    }
    getTotalDef(){
        var tmp = 0
        tmp += this.def
        if(this.weapon){
            tmp += weapon.def
        }
        if (this.headgear) {
            tmp += headgear.def
        }
        if (this.bodygear) {
            tmp += bodygear.def
        }
        if(this.accessory){
            tmp += accessory.def
        }
        return tmp*this.job.defMultiplier
    }
    getTotalAtkM(){
        var tmp = 0
        tmp += this.atkM
        if(this.weapon){
            tmp += weapon.atkM
        }
        if (this.headgear) {
            tmp += headgear.atkM
        }
        if (this.bodygear) {
            tmp += bodygear.atkM
        }
        if(this.accessory){
            tmp += accessory.atkM
        }
        return tmp*this.job.atkMMultiplier
    }
    getTotalDefM(){
        var tmp = 0
        tmp += this.defM
        if(this.weapon){
            tmp += weapon.defM
        }
        if (this.headgear) {
            tmp += headgear.defM
        }
        if (this.bodygear) {
            tmp += bodygear.defM
        }
        if(this.accessory){
            tmp += accessory.defM
        }
        return tmp*this.job.defMultiplier
    }
    getTotalSpeed(){
        var tmp = 0
        tmp += this.speed
        if(this.weapon){
            tmp += weapon.speed
        }
        if (this.headgear) {
            tmp += headgear.speed
        }
        if (this.bodygear) {
            tmp += bodygear.speed
        }
        if(this.accessory){
            tmp += accessory.speed
        }
        return tmp*this.job.speedMultiplier
    }
}
