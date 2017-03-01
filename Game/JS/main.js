var ctx = null

window.onload = function(){
    ctx = document.getElementById("canvas").getContext("2d")
    require([
        '/isometric/jsiso/canvas/Control',
        '/isometric/jsiso/tile/Field',
        '/isometric/requirejs/domReady!'
    ])
    fonction()
}


function tick(){
    console.log("tick");
    ctx.fillRect(0,0,20,20)
    window.requestAnimationFrame(tick)
}

fonction = function(CanvasControl, TileField) {

     // RGBA of color to use
     var tileColor = "(158, 154, 255, 1)";

     // Our Tile Map
     var tileMap = [
       [tileColor, 0, tileColor, 0, tileColor],
       [tileColor, tileColor, tileColor, 0, tileColor],
       [tileColor, 0, tileColor, 0, tileColor]
     ]

     // X & Y drawing position, and tile span to draw
     var xrange = 8;
     var yrange = 8;

     // use CanvasControl to create a simple canvas element
     var context = CanvasControl.create("canvas", 600, 300, {}, "main");

     var tileLayer = new TileField(context, CanvasControl().height, CanvasControl().width);

     tileLayer.setup({
       layout: tileMap,
       isometric: false, // Flag used to layout grid in non isometric format
       tileHeight: 80,
       tileWidth: 80 // Try setting isometric to true and half tileWidth to 40, for an isometric map
     });

     // Rotate our entire Map
     tileLayer.rotate("left");

     // Loop through our tiles and draw the map
     for (i = 0; i < xrange; i++) {
       for (j = 0; j < yrange; j++) {
         tileLayer.draw(i,j);
       }
     }

   }
