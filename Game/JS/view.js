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
      var fighterImage = Array()
      for (var i = 0; i < 4; i++) {
          fighterImage[i] = new Image()
      }
      fighterImage[0].src="sprites/monkeyPlayer.png"
      fighterImage[1].src="sprites/knight.png"
      fighterImage[2].src="sprites/feca.png"
      fighterImage[3].src="sprites/iop.png"

      var ctx = document.getElementById("canvas").getContext('2d')

      //menu and shit
      var selector = 0
      var menu = new MenuItem("Menu")
          var array = Array()
          menu.addSubMenu([new MenuItem("Inventaire"), new MenuItem("Fighters")])
          var selectorMax = menu.submenuItems.length
          var selectorFighter = 0//sert a garder l'image du joueur affiche
          //inventaire//
          $(player.inventaire).each(function(index, el) {
              array.push(new MenuItem(el.name))
          })
          menu.submenuItems[0].addSubMenu(array)
          //fighters
          array = Array()
          for (var i = 0; i < player.fighter.length; i++) {
              array.push(new MenuItem(player.fighter[i].name))
          }
          menu.submenuItems[1].addSubMenu(array)
          //fighters properties//
          array = Array()
          array.push(new MenuItem("classe"))
          array.push(new MenuItem("weapon"))
          array.push(new MenuItem("headgear"))
          array.push(new MenuItem("bodygear"))
          array.push(new MenuItem("accessory"))
          for (var i = 0; i < player.fighter.length; i++){
              menu.submenuItems[1].submenuItems[i].addSubMenu(array)
          }
          //all jobs
          array = Array()
          for (var i = 0; i < player.listJob.length; i++) {
              console.log(i);
              array.push(new MenuItem(player.listJob[i].name))
          }
          for (var i = 0; i < player.fighter.length; i++){
              menu.submenuItems[1].submenuItems[i].submenuItems[0].addSubMenu(array)
          }


      // imgLoad uses Promises, once the images have loaded we continue and use the returned imgResponse
      imgLoad(images).then(function(imgResponse) {

          // Create our Input controls and pass through the CanvasControl to it
          var input = new CanvasInput(document, CanvasControl());
          // Pressed is the keycode of user input, and keydown means the button is down rather than press ended
          input.keyboard(function(pressed, keydown) {
            if (!keydown) {
              switch(pressed) {
                // Move player
                case 37://left
                    if(!menu.selected){
                        if(player.localX != 0 || player.globalX >0){
                            player.localX --
                        }
                    }
                    if(menu.selected && !menu.isSomethingSelected() && selector > 0){
                        selector--
                    }
                    if(menu.submenuItems[0].selected && !menu.submenuItems[0].isSomethingSelected() && selector>1){
                        selector--
                    }
                    break;
                case 39://right
                    if(!menu.selected){
                        if(player.localX != (xrange-1) || player.globalX < (globalSize-1)){
                            player.localX ++
                        }
                    }
                    if(menu.selected && !menu.isSomethingSelected() && selector < selectorMax-1){
                        selector++
                    }
                    if(menu.submenuItems[0].selected && !menu.submenuItems[0].isSomethingSelected() && selector<selectorMax-1){
                        selector++
                    }
                    break
                case 40://down
                    if(!menu.selected){
                        if(player.localY != (yrange-1) || player.globalY < (globalSize-1)){
                            player.localY ++
                        }
                    }else if(menu.submenuItems[0].selected && !menu.submenuItems[0].isSomethingSelected() && selector<selectorMax-2){
                        selector+=2
                    }
                    if(menu.submenuItems[1].selected && !menu.submenuItems[0].isSomethingSelected() && selector<selectorMax-1){
                        selector++
                    }
                    if(menu.submenuItems[1].selected && menu.submenuItems[0].isSomethingSelected() && selector<selectorMax-1){
                        selector ++
                    }
                    break
                case 38://up
                    if(!menu.selected){
                        if(player.localY != 0 || player.globalY >0){
                            player.localY --
                        }
                    }else if(menu.submenuItems[0].selected && !menu.submenuItems[0].isSomethingSelected() && selector>1){
                        selector-=2
                    }
                    if(menu.submenuItems[1].selected && !menu.submenuItems[1].isSomethingSelected() && selector>0){
                        selector--
                    }
                    if(menu.submenuItems[1].selected && menu.submenuItems[1].isSomethingSelected() && selector>0){
                        selector--
                    }
                    break
                case 27://escape
                    if(!menu.selected){
                        menu.selected = true
                    }else{
                        selector = 0
                        //menu
                        if(menu.selected && !menu.isSomethingSelected()){
                            menu.selected = false
                        }
                        //inventaire
                        if(menu.submenuItems[0].selected && !menu.submenuItems[0].isSomethingSelected()){
                            menu.submenuItems[0].selected = false
                            selectorMax = menu.submenuItems.length
                        }
                        //fighters
                        else if(menu.submenuItems[1].selected && !menu.submenuItems[1].isSomethingSelected()){
                            menu.submenuItems[1].selected = false
                            selectorMax = menu.submenuItems.length
                        }
                        //fighter properties
                        else if(menu.submenuItems[1].isSomethingSelected()){
                            for (var i = 0; i < menu.submenuItems[1].submenuItems.length; i++) {
                                if(menu.submenuItems[1].submenuItems[i].selected && !menu.submenuItems[1].submenuItems[i].isSomethingSelected()){
                                    menu.submenuItems[1].submenuItems[i].selected = false
                                    selectorMax = menu.submenuItems[1].submenuItems.length
                                }
                            }
                        }
                    }
                    break
                case 13://enter
                    //if menu principal
                    if(menu.selected && !menu.isSomethingSelected()){
                        menu.submenuItems[selector].selected = true
                        selectorMax = menu.submenuItems[selector].submenuItems.length
                        selector = 0
                        break
                        //if inventaire
                    }if(menu.submenuItems[0].selected && !menu.submenuItems[0].isSomethingSelected()){
                        selectorMax = menu.submenuItems[0].submenuItems.length
                        // menu.submenuItems[0].submenuItems[selector].selected = true
                        break
                    }
                    //if fighters
                    if(menu.submenuItems[1].selected && !menu.submenuItems[1].isSomethingSelected()){
                        menu.submenuItems[1].submenuItems[selector].selected = true
                        selectorMax = menu.submenuItems[1].submenuItems[selector].submenuItems.length
                        selector = 0
                        break
                    }
                    //if one-of-fighters-properties
                    // for (var i = 0; i < menu.submenuItems[1].submenuItems.length; i++) {
                        if(menu.submenuItems[1].submenuItems[selectorFighter].selected && !menu.submenuItems[1].submenuItems[selectorFighter].isSomethingSelected()){
                            menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selector].selected = true
                            selectorMax = menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[0].submenuItems.length
                            selector = 0
                            console.log("propertiesSelect: "+menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[0].submenuItems.length);
                        }
                    // }
                    if(menu)

                    break

                }
              player.updatePosition()
              updateLayers()
              drawTileMap()
              drawPlayerInfo()
              drawMenu()
              console.log("selector: " + selector + "   SelectorMax: "+selectorMax);
            }
          });


          var jsontilelayer = null

          function drawMenu(){
              if(menu.selected){
                  ////////backkground/////////
                  ctx.strokeStyle = "white"
                  ctx.globalAlpha = 0.8
                  ctx.strokeRect(100, 50, 800, 80)
                  ctx.fillRect(101, 51, 798, 78)
                  if(menu.isSomethingSelected()){
                      ctx.fillStyle="#1111FF"
                      ctx.strokeRect(100, 150, 800, 400)
                      ctx.fillRect(101, 151, 798, 398)
                  }
                  ////////foreground////////
                  ctx.fillStyle = "white"
                  ctx.font="25px Courier New"
                  $(menu.submenuItems).each(function(index, el) {
                      ctx.fillText(el.name, 160+(index*240), 95, 100, 50)
                  })
                  if(!menu.isSomethingSelected()){
                      ctx.fillRect(160+(selector*240), 105, 80, 4)
                  }
                  /////////Inventaire////////
                  if(menu.submenuItems[0].selected){
                      ctx.font="20px Courier New"
                      $(menu.submenuItems[0].submenuItems).each(function(index, el) {
                          ctx.fillText(el.name, 200+(index%2)*400, 200+(Math.floor(index/2))*50, 120, 50)
                          if(selector == index){
                              ctx.fillRect(200+(index%2)*400, 201+(Math.floor(index/2))*50, 120, 4)
                          }
                      });
                  }
                  ////////Fighters////////
                  else if(menu.submenuItems[1].selected){
                    ctx.font="20px Courier New"
                    ctx.drawImage(fighterImage[0], 130, 150, 110, 80)
                    ctx.drawImage(fighterImage[1], 130, 250, 110, 80)
                    ctx.drawImage(fighterImage[2], 130, 350, 110, 80)
                    ctx.drawImage(fighterImage[3], 130, 450, 110, 80)
                    if(!menu.submenuItems[1].isSomethingSelected()){
                        ctx.strokeRect(135, 140+selector*100, 100, 100)
                        selectorFighter = selector
                    }
                    ctx.fillText("Nom : " + player.fighter[selectorFighter].name, 400, 190, 200, 200)
                    ctx.fillText("Classe : " + player.fighter[selectorFighter].job.name, 400, 220, 200, 200)
                    ctx.fillText("Niveau : "+player.fighter[selectorFighter].level, 400, 250, 200, 200)
                    ctx.font="16px Courier New"
                    ctx.fillText("HP max : "+player.fighter[selectorFighter].HPMax, 300, 300, 200, 200)
                    ctx.fillText("MP max : "+player.fighter[selectorFighter].MPMax, 300, 330, 200, 200)
                    ctx.fillText("Attack : "+player.fighter[selectorFighter].getTotalAtk(), 300, 360, 200, 200)
                    ctx.fillText("Defense : "+player.fighter[selectorFighter].getTotalDef(), 300, 390, 200, 200)
                    ctx.fillText("Magie : "+player.fighter[selectorFighter].getTotalAtkM(), 300, 420, 200, 200)
                    ctx.fillText("Defense magique: "+player.fighter[selectorFighter].getTotalDefM(), 300, 450, 200, 200)
                    ctx.fillText("Vitesse : "+player.fighter[selectorFighter].getTotalSpeed(), 300, 480, 200, 200)
                    ctx.fillText("Critique : "+player.fighter[selectorFighter].crit+"%", 300, 510, 200, 200)
                    if (player.fighter[selectorFighter].weapon) {
                        ctx.fillText("Arme : "+player.fighter[selectorFighter].weapon.name, 600, 300, 200, 200)
                    }else {
                        ctx.fillText("Arme : None", 600, 300, 200, 200)
                    }
                    if (player.fighter[selectorFighter].headgear) {
                        ctx.fillText("Tete : "+player.fighter[selectorFighter].headgear.name, 600, 350, 200, 200)
                    }else {
                        ctx.fillText("Tete : None", 600, 350, 200, 200)
                    }
                    if (player.fighter[selectorFighter].bodygear) {
                        ctx.fillText("Corps : "+player.fighter[selectorFighter].bodygear.name, 600, 400, 200, 200)
                    }else {
                        ctx.fillText("Corps : None", 600, 400, 200, 200)
                    }
                    if (player.fighter[selectorFighter].accessory) {
                        ctx.fillText("Accessoire : "+player.fighter[selectorFighter].accessory.name, 600, 450, 200, 200)
                    }else {
                        ctx.fillText("Accessoire : None", 600, 450, 200, 200)
                    }

                    //////////Modif Fighters/////////
                    if(menu.submenuItems[1].isSomethingSelected()){
                        if(selector == 0){
                            ctx.strokeRect(390, 200, 220, 30)
                        }else{
                            ctx.strokeRect(590, 280+50*(selector-1), 220, 30)
                        }
                    }
                  }
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
                  objectLayer.draw(i, j, fighterImage[0])
                }
              }
            }
          }

          function drawPlayerInfo(){

              for (var i = 0; i < player.fighter.length; i++) {
                  ctx.strokeStyle = "#321010"
                  ctx.fillStyle="#321010"
                  ctx.drawImage(backgroundScroll, 50+285*i,650, 180, 180)
                  ctx.font="25px Courier New"
                  ctx.fillText(player.fighter[i].name, 82+285*i, 712, 100)
                  switch (i) {
                        case 0:
                            ctx.drawImage(fighterImage[0],110+285*i, 712, 42, 40)
                            break;
                        case 1:
                            ctx.drawImage(fighterImage[1],110+285*i, 712, 42, 40)
                            break;
                        case 2:
                            ctx.drawImage(fighterImage[2],110+285*i, 712, 42, 40)
                            break;
                        case 3:
                            ctx.drawImage(fighterImage[3],110+285*i, 712, 42, 40)
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
