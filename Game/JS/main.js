var view = null

importJS("view.js")

window.onload = function(){
    view = new View()
    view.draw()
    tick()
}


function tick(){
    requestAnimationFrame(tick)
}

//importe des fichiers JS dans le head du html
function importJS(str){
    head = document.getElementsByTagName("head")[0]
    var node = document.createElement("script")
    node.src="JS/"+str
    head.insertBefore(node, head.firstChild)
}
