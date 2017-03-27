var view = null
var model = null

importJS("view.js")
importJS("model.js")
importJS("player.js")
importJS("fighter.js")
importJS("job.js")

window.onload = function(){
    initGame()
    view.draw(model.player)
    tick()
}


function tick(){
    // view.drawPlayerInfo()
    requestAnimationFrame(tick)
}

//importe des fichiers JS dans le head du html
function importJS(str){
    head = document.getElementsByTagName("head")[0]
    var node = document.createElement("script")
    node.src="JS/"+str
    head.insertBefore(node, head.firstChild)
}

function initGame(){
    console.log("init")
    view = new View()
    model = new Model(new Player())
    console.log("init done");
}
