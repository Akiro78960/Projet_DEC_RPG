var view = null
var model = null

importJS("view.js")
importJS("model.js")
importJS("player.js")

window.onload = function(){
    view = new View()
    model = new Model(new Player())
    view.draw(model.player)
    tick()
}


function tick(){
    console.log("playerX = " + model.player.localX + ", playerY = "+model.player.localY);
    requestAnimationFrame(tick)
}

//importe des fichiers JS dans le head du html
function importJS(str){
    head = document.getElementsByTagName("head")[0]
    var node = document.createElement("script")
    node.src="JS/"+str
    head.insertBefore(node, head.firstChild)
}
