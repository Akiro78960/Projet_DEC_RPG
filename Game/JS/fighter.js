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
    }
}
