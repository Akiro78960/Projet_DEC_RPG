class View{
    constructor(){

    }

    draw(player){
        require([
      'jsiso/canvas/Control',
      'jsiso/tile/Field',
      'jsiso/img/load',
      'jsiso/json/load',
      'jsiso/canvas/Input',
      'requirejs/domReady!'
    ],
    function(CanvasControl, TileField, imgLoad, jsonLoader, CanvasInput) {
        jsonLoader(['JS/maps.json','JS/imageFiles.json']).then(function(jsonResponse){

      // X & Y drawing position, and tile span to draw
      var xrange = 10
      var yrange = 10

      var ralphGraphic = null // Will contain the image of Raplh once it has been loaded

      var context = CanvasControl.create("canvas", 640, 640, {}, "main")
      CanvasControl.fullScreen()

      // Two layers - one for the ground, second layer for objects, player objects, NPCS, pickups, etc etc
      var tileLayer = new TileField(context, CanvasControl().height, CanvasControl().width);
      var objectLayer = new TileField(context, CanvasControl().height, CanvasControl().width);

      // Create our Input controls and pass through the CanvasControl to it
      var input = new CanvasInput(document, CanvasControl());
      // Pressed is the keycode of user input, and keydown means the button is down rather than press ended
      input.keyboard(function(pressed, keydown) {
        if (!keydown) {
          switch(pressed) {
            // Move player
            case 37:
              player.localX --
            break;
            case 39:
              player.localX ++
            break
            case 40:
              player.localY ++
            break
            case 38:
              player.localY --
            break
          }
          // Call draw Tile Map function
          drawTileMap()
        }
      });


      function drawTileMap() {
        // Clear drawn map before clearing
        context.clearRect(0, 0, CanvasControl().width, CanvasControl().height)
        // Loop through our tiles and draw the map
        for (var i = 0; i < 0 + xrange; i++) {
          for (var j = 0; j < 0 + yrange; j++) {
            tileLayer.draw(i, j)
            if (i === player.localX && j === player.localY) {
              objectLayer.draw(i, j, ralphGraphic)
            }
          }
        }
      }


          var images = [
              {
                  graphics: jsonResponse[1].groundImages
              },
              {
                  graphics: jsonResponse[1].playerImages
              }
          ]


      // imgLoad uses Promises, once the images have loaded we continue and use the returned imgResponse
      imgLoad(images).then(function(imgResponse) {

        // set Raplphs image, imgResponse[1] because it was the second list of graphics to be loaded
        ralphGraphic = imgResponse[1].files["image.png"]


        tileLayer.setup({
          title: "Ground Layer",
          layout: jsonResponse[0].ground,
          graphics: imgResponse[0].files,
          graphicsDictionary: imgResponse[0].dictionary,
          isometric: true, // Flag used to layout grid in isometric format
          tileHeight: 50,
          tileWidth: 100,
          heightMap: {
          map: jsonResponse[0].height,
          // imgResponse[0] contains the first set of grpahic files[] we placed in the graphics array
          heightTile: imgResponse[0].files["block.png"],
          offset: 0
          },
          shadow: {
            offset: 50, // Offset is the same height as the stack tile
            verticalColor: '(5, 5, 30, 0.2)',
            horizontalColor: '(6, 5, 50, 0.3)'
          }
        })
        // Object Layer
        objectLayer.setup({
          title: "Object Layer",
          isometric: true, // Flag used to layout grid in isometric format
          zeroIsBlank: true,
          layout: jsonResponse[0].objects,
          tileHeight: 50,
          tileWidth: 100,
          heightMap: {
            map: jsonResponse[0].height ,
            offset: 50,
            heightMapOnTop: true// We want to draw only on top of the heightmap
          }
        })

        // Rotate our entire Map
        tileLayer.rotate("left")
        objectLayer.rotate("left")
        tileLayer.flip("vertical")
        objectLayer.flip("vertical")

        // Set an offset so our map is on screen
        tileLayer.setOffset(500, 100)
        objectLayer.setOffset(500, 100)

        // Call draw Tile Map function
        drawTileMap()
      })
      })
    })
    }
}
