var view = null
var model = null
var tailleMap = 2

importJS("view.js")
importJS("model.js")
importJS("player.js")
importJS("fighter.js")
importJS("job.js")
importJS("equipment.js")
importJS("menuItem.js")
importJS("dammageDisplay.js")
importJS("lib/jquery-3.2.1.min.js")

window.onload = function(){
    initGame()
    view.draw(model.player)
}



//importe des fichiers JS dans le head du html
function importJS(str){
    head = document.getElementsByTagName("head")[0]
    var node = document.createElement("script")
    node.src="JS/"+str
    head.insertBefore(node, head.firstChild)
}

function initGame(){
    view = new View()
    model = new Model(new Player())
}
