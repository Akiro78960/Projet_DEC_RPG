class DammageDisplay{
    constructor(str, x, y){
        this.str = -str
        this.x = x
        this.y = y
        this.compteur = 100
        console.log("new DD");
    }
    tick(){
        this.compteur++
        console.log(this.compteur);
    }
    render(ctx){
        if(this.compteur<= 60){
            this.tick()
            ctx.font="35px Arial"
            ctx.fillStyle = "red"
            //calcul position using isometric coordonates
            var posX = (this.x - this.y)*40 + 517
            var posY = (this.x + this.y)*20 + 80
            ctx.fillText(this.str, posX, posY-this.compteur*2)
            // console.log("posX: "+posX+"  posY: "+posY);
        }
    }

}
