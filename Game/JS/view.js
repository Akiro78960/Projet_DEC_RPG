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
      var xrange = 12
      var yrange = 12
      var globalSize = 2


      var context = CanvasControl.create("canvas", 640, 640, {}, "main")
      CanvasControl.fullScreen()

      // Two layers - one for the ground, second layer for objects, player objects, NPCS, pickups, etc etc
      var tileLayer = new TileField(context, CanvasControl().height, CanvasControl().width);
      var objectLayer = new TileField(context, CanvasControl().height, CanvasControl().width);


      var images = [
          {
              graphics: jsonResponse[1].groundImages
          },
          {
              graphics: jsonResponse[1].playerImages
          }
      ]

      var backgroundScroll = new Image()
      backgroundScroll.src="sprites/oldScroll.png"
      var fighter1Image = new Image()
      var fighter2Image = new Image()
      var fighter3Image = new Image()
      var fighter4Image = new Image()
      fighter1Image.src="sprites/monkeyPlayer.png"
      fighter2Image.src="sprites/knight.png"
      fighter3Image.src="sprites/feca.png"
      fighter4Image.src="sprites/iop.png"

      var ctx = document.getElementById("canvas").getContext('2d')
      var menu = false
      var menuItems = ["Inventaire", "Fighters"]
      var selectedItem = 0
      var maxSelectedItem = menuItems.length

      // imgLoad uses Promises, once the images have loaded we continue and use the returned imgResponse
      imgLoad(images).then(function(imgResponse) {

          // Create our Input controls and pass through the CanvasControl to it
          var input = new CanvasInput(document, CanvasControl());
          // Pressed is the keycode of user input, and keydown means the button is down rather than press ended
          input.keyboard(function(pressed, keydown) {
            if (!keydown) {
              switch(pressed) {
                // Move player
                case 37:
                    if(!menu){
                        if(player.localX != 0 || player.globalX >0){
                            player.localX --
                        }
                    }
                    if(selectedItem > 0){
                        selectedItem--
                    }
                    break;
                case 39:
                    if(!menu){
                        if(player.localX != (xrange-1) || player.globalX < (globalSize-1)){
                            player.localX ++
                        }
                    }
                    if(selectedItem < maxSelectedItem-1){
                        selectedItem++
                    }
                    break
                case 40:
                    if(!menu){
                        if(player.localY != (yrange-1) || player.globalY < (globalSize-1)){
                            player.localY ++
                        }
                    }
                    break
                case 38:
                    if(!menu){
                        if(player.localY != 0 || player.globalY >0){
                            player.localY --
                        }
                    }
                    break
                case 27:
                if(!menu){
                    menu = true
                }else{
                    menu = false
                }
              }
              player.updatePosition()
              updateLayers()
              drawTileMap()
              drawPlayerInfo()
              drawMenu()
            }
          });


          var jsontilelayer = null

          function drawMenu(){
              if(menu){
                  ctx.strokeStyle = "white"
                  ctx.globalAlpha = 0.8
                  ctx.strokeRect(100, 50, 800, 80)
                  ctx.fillRect(101, 51, 798, 78)
                  ctx.fillStyle = "white"
                  ctx.font="25px Courier New"
                  $(menuItems).each(function(index, el) {
                      ctx.fillText(el, 160+(index*230), 95, 100, 50)
                  });
                  ctx.fillRect(160+(selectedItem*230), 105, 80, 4)
              }
              ctx.globalAlpha = 1
          }


          function drawTileMap() {
            // Clear drawn map before clearing
            context.clearRect(0, 0, CanvasControl().width, CanvasControl().height)
            // Loop through our tiles and draw the map
            for (var i = 0; i < 0 + xrange; i++) {
              for (var j = 0; j < 0 + yrange; j++) {
                tileLayer.draw(i, j)
                if (i === player.localX && j === player.localY) {
                  objectLayer.draw(i, j, fighter1Image)
                }
              }
            }
          }

          function drawPlayerInfo(){

              for (var i = 0; i < player.fighter.length; i++) {
                  ctx.fillStyle="#321010"
                  ctx.drawImage(backgroundScroll, 50+285*i,650, 180, 180)
                  ctx.font="25px Courier New"
                  ctx.fillText(player.fighter[i].name, 82+285*i, 712, 100)
                  switch (i) {
                        case 0:
                            ctx.drawImage(fighter1Image,110+285*i, 712, 42, 40)
                            break;
                        case 1:
                            ctx.drawImage(fighter2Image,110+285*i, 712, 42, 40)
                            break;
                        case 2:
                            ctx.drawImage(fighter3Image,110+285*i, 712, 42, 40)
                            break;
                        case 3:
                            ctx.drawImage(fighter4Image,110+285*i, 712, 42, 40)
                            break;
                  }

                  ctx.strokeRect(90+285*i, 755, 100, 8)
                  ctx.strokeRect(100+285*i, 785, 100, 8)
                  ctx.font="13px Courier New"
                  ctx.fillText("HP: "+player.fighter[i].HP+"/"+player.fighter[i].HPMax, 98+285*i, 774)
                  ctx.fillText("MP: "+player.fighter[i].MP+"/"+player.fighter[i].MPMax, 108+285*i, 804)
                  ctx.fillStyle="#FF0000"
                  ctx.fillRect(91+285*i, 756, player.fighter[i].HP/player.fighter[i].HPMax*98, 6)
                  ctx.fillStyle="#1111FF"
                  ctx.fillRect(101+285*i, 786, player.fighter[i].MP/player.fighter[i].MPMax*98, 6)
              }
            //   ctx.fillRect(100,100,300,300)
          }


              function updateLayers(){

                  tileLayer.setup({
                                title: "Ground Layer",
                                layout: jsonResponse[0].ground[player.strGlobalX][player.strGlobalY],
                                graphics: imgResponse[0].files,
                                graphicsDictionary: imgResponse[0].dictionary,
                                isometric: true, // Flag used to layout grid in isometric format
                                tileHeight: 30,
                                tileWidth: 60,
                                heightMap: {
                                map: jsonResponse[0].height[player.strGlobalX][player.strGlobalY],
                                // imgResponse[0] contains the first set of grpahic files[] we placed in the graphics array
                                heightTile: imgResponse[0].files["blockTerrain_1.png"],
                                offset: 0
                                },
                                shadow: {
                                  offset: 30, // Offset is the same height as the stack tile
                                  verticalColor: '(5, 5, 30, 0.2)',
                                  horizontalColor: '(6, 5, 50, 0.3)'
                                }
                              })
                  tileLayer.rotate("left")
                  tileLayer.flip("vertical")

                  objectLayer.setup({
                    title: "Object Layer",
                    isometric: true, // Flag used to layout grid in isometric format
                    zeroIsBlank: true,
                    layout: jsonResponse[0].objects,
                    tileHeight: 30,
                    tileWidth: 60,
                    heightMap: {
                      map: jsonResponse[0].height[player.strGlobalX][player.strGlobalY],
                      offset: 30,
                      heightMapOnTop: true// We want to draw only on top of the heightmap
                    }
                  })
                  objectLayer.rotate("left")
                  objectLayer.flip("vertical")
              }




            tileLayer.setup({
                          title: "Ground Layer",
                          layout: jsonResponse[0].ground[player.strGlobalX][player.strGlobalY],
                          graphics: imgResponse[0].files,
                          graphicsDictionary: imgResponse[0].dictionary,
                          isometric: true, // Flag used to layout grid in isometric format
                          tileHeight: 30,
                          tileWidth: 60,
                          heightMap: {
                          map: jsonResponse[0].height[player.strGlobalX][player.strGlobalY],
                          // imgResponse[0] contains the first set of grpahic files[] we placed in the graphics array
                              heightTile: imgResponse[0].files["blockTerrain_1.png"],
                          offset: 0
                          },
                          shadow: {
                            offset: 30, // Offset is the same height as the stack tile
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
              tileHeight: 30,
              tileWidth: 60,
              heightMap: {
                map: jsonResponse[0].height[player.strGlobalX][player.strGlobalY],
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
            drawPlayerInfo()
      })
      })
    })
    }


}
