var ctx = null

window.onload = function(){
    ctx = document.getElementById("canvas").getContext("2d")
    tick()
}


function tick(){
    console.log("tick");
    ctx.fillRect(0,0,20,20)
    window.requestAnimationFrame(tick)
}
