require([
      'jsiso/canvas/Control',
      'jsiso/tile/Field',
      'jsiso/img/load',
      'requirejs/domReady!'
    ],
    function(CanvasControl, TileField, imgLoad) {

      // RGBA of color to use
      var tileColor = "(158, 154, 255, 1)";

      // Our Tile Map
      var tileMap = [
        [tileColor, 0, tileColor, 0, tileColor],
        [tileColor, tileColor, tileColor, 0, tileColor],
        [tileColor, 0, tileColor, 0, tileColor]
      ]

      // Our Height Map
      var tileHeightMap = [
        [3,0,1,0,1],
        [4,1,1,0,2],
        [3,0,1,0,1]
      ]

      // X & Y drawing position, and tile span to draw
      var xrange = 8;
      var yrange = 8;

      // use CanvasControl to create a simple canvas element
      // ID of Canvas,
      // width of Canvas,
      // Height of Canvas,
      // Optioanl: Any Style proprties we wish to apply,
      // Optional: The DOM ID location we wish to place the canvas in, otherwise it appends to Body
      var context = CanvasControl.create("canavas", 640, 640, {}, "main");

      var tileLayer = new TileField(context, CanvasControl().height, CanvasControl().width);

      var images = [
        {
          graphics: [
            "/img/game/ground/blank-block.png" // The images we want to load using imgLoader
          ]
        }
      ];


      imgLoad(images).then(function(imgResponse) { // imgLoad uses Promises, once the images have loaded we continue and use the returned imgResponse

        tileLayer.setup({
          layout: tileMap,
          isometric: true, // Flag used to layout grid in non isometric format
          tileHeight: 40,
          tileWidth: 80,
          zeroIsBlank: true,
          heightMap: {
            map: tileHeightMap,
            heightTile: imgResponse[0].files["blank-block.png"], // imgResponse[0] contains the files[] we placed in the graphcis array for loading
            offset: 0
          },
        });

        // Rotate our entire Map
        tileLayer.rotate("left");

        // Set an offset so our map is on screen
        tileLayer.setOffset(300, 300)


        // Loop through our tiles and draw the map
        for (i = 0; i < 0 + xrange; i++) {
          for (j = 0; j < 0 + yrange; j++) {
            tileLayer.draw(i,j);
          }
        }
      });
    });
