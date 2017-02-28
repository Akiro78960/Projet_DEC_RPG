var ctx = document.getElementById("canvas").getContext("2d")

window.onload = function(){

    tick()
}


function tick(){
    console.log("tick");
    window.requestAnimationFrame(tick)
}
