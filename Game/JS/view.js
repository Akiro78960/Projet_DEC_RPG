class View{
    constructor(){
        this.compteur = 0
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

      var ennemiImages = Array()
      ennemiImages["wolf"] = new Image()
      ennemiImages["wolf"].src = "sprites/lucario.png"

      var imageBG = new Image()
      imageBG.src="sprites/background.jpg"

      var moveImage = new Image()
      moveImage.src="sprites/hintMove.png"

      var ctx = document.getElementById("canvas").getContext('2d')

      var dammage = 0
      var dammageDisplay = null





///////////////////////MENUS//////////////////////
      //menu escape
      var selector = 0
      var menu = new MenuItem("Menu")
          var array = Array()
          menu.addSubMenu([new MenuItem("Inventaire"), new MenuItem("Fighters")])
          var selectorMax = menu.submenuItems.length
          var selectorFighter = 0//sert a garder l'image du joueur affiche
          var selectorPropertie = 0

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
              array.push(new MenuItem(player.listJob[i].name))
          }
          for (var i = 0; i < player.fighter.length; i++){
              menu.submenuItems[1].submenuItems[i].submenuItems[0].addSubMenu(array)
          }
          //all weapons
          array = Array()
          for (var i = 0; i < player.inventaire.length; i++) {
              if(player.inventaire[i].type != "headgear" && player.inventaire[i].type != "bodygear" && player.inventaire[i].type != "accessory"){
                  array.push(new MenuItem(player.inventaire[i].name))
              }
          }
          for (var i = 0; i < player.fighter.length; i++){
              menu.submenuItems[1].submenuItems[i].submenuItems[1].addSubMenu(array)
          }
          //all headgears
          array = Array()
          for (var i = 0; i < player.inventaire.length; i++) {
              if(player.inventaire[i].type == "headgear"){
                  array.push(new MenuItem(player.inventaire[i].name))
              }
          }
          for (var i = 0; i < player.fighter.length; i++){
              menu.submenuItems[1].submenuItems[i].submenuItems[2].addSubMenu(array)
          }

          //all bodygears
          array = Array()
          for (var i = 0; i < player.inventaire.length; i++) {
              if(player.inventaire[i].type == "bodygear"){
                  array.push(new MenuItem(player.inventaire[i].name))
              }
          }
          for (var i = 0; i < player.fighter.length; i++){
              menu.submenuItems[1].submenuItems[i].submenuItems[3].addSubMenu(array)
          }
          //all accessories
          array = Array()
          for (var i = 0; i < player.inventaire.length; i++) {
              if(player.inventaire[i].type == "accessory"){
                  array.push(new MenuItem(player.inventaire[i].name))
              }
          }
          for (var i = 0; i < player.fighter.length; i++){
              menu.submenuItems[1].submenuItems[i].submenuItems[4].addSubMenu(array)
          }


          ////////////////Menu Fight///////////////////////////

          var menuFight = new MenuItem("menuFight")
          menuFight.addSubMenu([new MenuItem("Move"), new MenuItem("Action"), new MenuItem("End turn")])
          menuFight.submenuItems[1].addSubMenu([new MenuItem("Attack"), new MenuItem("Spell")])
          var selectorMove = new Object()
          selectorMove.x = 2
          selectorMove.y = 0
          selectorMove.img = new Image()
          selectorMove.img.src = "sprites/selectorMove.png"




      // imgLoad uses Promises, once the images have loaded we continue and use the returned imgResponse
      imgLoad(images).then(function(imgResponse) {
          // Create our Input controls and pass through the CanvasControl to it
          var input = new CanvasInput(document, CanvasControl());
          // Pressed is the keycode of user input, and keydown means the button is down rather than press ended
          input.keyboard(function(pressed, keydown) {
            if (!keydown) {
                if(!player.inFight){
                    switch(pressed) {
                        // Move player
                        case 37://left
                            if(!menu.selected){
                                if(player.localX != 0 || player.globalX >0){
                                    player.localX --
                                    startFight()
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
                                    startFight()
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
                                    startFight()
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
                                    startFight()
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
                            if(menu.submenuItems[1].submenuItems[selectorFighter].selected && !menu.submenuItems[1].submenuItems[selectorFighter].isSomethingSelected()){
                                console.log("click on of properties");
                                menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selector].selected = true
                                selectorMax = menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selector].submenuItems.length
                                selectorPropertie = selector
                                selector = 0
                            }
                            //select if job is selected
                            else if(menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].selected && !menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].isSomethingSelected()){
                                menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].submenuItems[selector].selected = true
                            }
                            //modif job/equipment
                            if(menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[0].isSomethingSelected()){
                                console.log("job changed");
                                menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[0].submenuItems[selector].selected = false
                                menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[0].selected = false
                                player.fighter[selectorFighter].job = player.listJob[selector]
                                player.fighter[selectorFighter].weapon = null
                                selectorMax = menu.submenuItems[1].submenuItems[selectorFighter].submenuItems.length
                                selector = 0
                            }else if(menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[1].isSomethingSelected()){
                                if(player.fighter[selectorFighter].job.weaponAllowed == player.inventaire[player.getInventaireIndex(menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].submenuItems[selector].name)].type){
                                    console.log("weapon changed");
                                    player.fighter[selectorFighter].weapon = player.inventaire[player.getInventaireIndex(menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].submenuItems[selector].name)]
                                    menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].submenuItems[selector].selected = false
                                    menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].selected = false

                                    selectorMax = menu.submenuItems[1].submenuItems[selectorFighter].submenuItems.length
                                    selector = 0
                                }
                            }else if(menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[2].isSomethingSelected()){
                                console.log("headgear changed");
                                player.fighter[selectorFighter].headgear = player.inventaire[player.getInventaireIndex(menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].submenuItems[selector].name)]
                                menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].submenuItems[selector].selected = false
                                menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].selected = false

                                selectorMax = menu.submenuItems[1].submenuItems[selectorFighter].submenuItems.length
                                selector = 0
                            }else if(menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[3].isSomethingSelected()){
                                console.log("bodygear changed");
                                player.fighter[selectorFighter].bodygear = player.inventaire[player.getInventaireIndex(menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].submenuItems[selector].name)]
                                menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].submenuItems[selector].selected = false
                                menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].selected = false

                                selectorMax = menu.submenuItems[1].submenuItems[selectorFighter].submenuItems.length
                                selector = 0
                            }else if(menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[4].isSomethingSelected()){
                                console.log("accessory changed");
                                player.fighter[selectorFighter].accessory = player.inventaire[player.getInventaireIndex(menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].submenuItems[selector].name)]
                                menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].submenuItems[selector].selected = false
                                menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].selected = false

                                selectorMax = menu.submenuItems[1].submenuItems[selectorFighter].submenuItems.length
                                selector = 0
                            }

                            break

                    }

                }else{//else if player.inFight
                    switch(pressed) {
                        case 37: //left
                            if(menuFight.submenuItems[0].selected || menuFight.submenuItems[1].submenuItems[0].selected){
                                if(selectorMove.x > 0){
                                    selectorMove.x--
                                }
                            }
                            break
                        case 39: //right
                            if(menuFight.submenuItems[0].selected || menuFight.submenuItems[1].submenuItems[0].selected){
                                if(selectorMove.x < player.localSizeMax-1){
                                    selectorMove.x++
                                }
                            }
                            break
                        case 40: //down
                            //menuFight
                            if(!menuFight.isSomethingSelected()){
                                if(selector<selectorMax-1){
                                    selector ++
                                }else {
                                    selector = 0
                                }
                            }
                            //if move ou attack
                            if(menuFight.submenuItems[0].selected || menuFight.submenuItems[1].submenuItems[0].selected){
                                if(selectorMove.y < player.localSizeMax-1){
                                    selectorMove.y++
                                }
                            //if action
                            }else if(menuFight.submenuItems[1].selected){
                                if(selector<selectorMax-1)
                                    selector ++
                                else
                                    selector = 0
                            }
                            break
                        case 38: //up
                            if(!menuFight.isSomethingSelected()){
                                if(selector>0)
                                    selector --
                                else
                                    selector = selectorMax-1
                            }
                            if(menuFight.submenuItems[0].selected || menuFight.submenuItems[1].submenuItems[0].selected){
                                if(selectorMove.y > 0){
                                    selectorMove.y--
                                }
                            }else if(menuFight.submenuItems[1].selected){
                                if(selector>0)
                                    selector --
                                else
                                    selector = selectorMax-1
                            }
                            break
                        case 27://escape
                            if(menuFight.submenuItems[0].selected)
                                menuFight.submenuItems[0].selected = false
                            else if(menuFight.submenuItems[1].selected){
                                if(!menuFight.submenuItems[1].isSomethingSelected())
                                    menuFight.submenuItems[1].selected = false
                                else if(menuFight.submenuItems[1].submenuItems[0].selected)
                                    menuFight.submenuItems[1].submenuItems[0].selected = false
                                else if(menuFight.submenuItems[1].submenuItems[1].selected)
                                    menuFight.submenuItems[1].submenuItems[1].selected = false
                            }
                            break
                        case 13://enter
                            //select menuItem
                            if(menuFight.selected && !menuFight.isSomethingSelected() && menuFight.submenuItems[selector].enabled){
                                menuFight.submenuItems[selector].selected = true
                                if(selector == 0){
                                    selectorMove.x = player.arrayFighters[player.indexFighterCombat].x
                                    selectorMove.y = player.arrayFighters[player.indexFighterCombat].y
                                }
                                selector = 0
                            }
                            //confirme le deplacement
                            else if(menuFight.submenuItems[0].selected){
                                //verif si fighter peut aller sur tile
                                if(player.arrayFighters[player.indexFighterCombat].isAccessible(selectorMove.x, selectorMove.y, player.arrayFighters[player.indexFighterCombat].job.mobility) && !player.getUnit(selectorMove.x, selectorMove.y)){
                                    menuFight.submenuItems[0].selected = false
                                    player.arrayFighters[player.indexFighterCombat].x = selectorMove.x
                                    player.arrayFighters[player.indexFighterCombat].y = selectorMove.y
                                    menuFight.submenuItems[0].enabled = false
                                    //place le selector automatiquement
                                    if(!menuFight.submenuItems[0].enabled){
                                        if(!menuFight.submenuItems[1].enabled){
                                            selector = 2
                                        }else{
                                            selector = 1
                                        }
                                    }
                                }
                            }
                            //menu actions
                            else if(menuFight.submenuItems[1].selected){
                                if(!menuFight.submenuItems[1].isSomethingSelected()){
                                    menuFight.submenuItems[1].submenuItems[selector].selected = true
                                    selectorMove.x = player.arrayFighters[player.indexFighterCombat].x
                                    selectorMove.y = player.arrayFighters[player.indexFighterCombat].y
                                }
                                //Attack
                                else if(menuFight.submenuItems[1].submenuItems[0].selected){
                                    if(player.getUnit(selectorMove.x, selectorMove.y) && player.arrayFighters[player.indexFighterCombat].isAccessible(selectorMove.x, selectorMove.y, player.arrayFighters[player.indexFighterCombat].getAttackRange()) && !(player.arrayFighters[player.indexFighterCombat].x == selectorMove.x && player.arrayFighters[player.indexFighterCombat].y == selectorMove.y)){
                                        dammage = player.arrayFighters[player.indexFighterCombat].attack(player.getUnit(selectorMove.x, selectorMove.y))
                                        dammageDisplay = new DammageDisplay(dammage, selectorMove.x, selectorMove.y)
                                        menuFight.submenuItems[1].submenuItems[0].selected = false
                                        menuFight.submenuItems[1].selected = false
                                        menuFight.submenuItems[1].enabled = false
                                        dammageDisplay.render()
                                    }

                                }
                            }
                            //fin de tour
                            if(menuFight.submenuItems[2].selected){
                                menuFight.submenuItems[2].selected = false
                                selector = 0
                                selectorMax = menuFight.submenuItems.length
                                menuFight.submenuItems[0].enabled = true
                                menuFight.submenuItems[1].enabled = true
                                player.endTurn()
                            }
                            break

                    }
                    console.log("selector: "+selector + "  selectorMax: "+selectorMax);
                    player.updateFighters()
                    player.getInfosCombat()

                }

              player.updatePosition()
              updateLayers()
            }
          });


          var jsontilelayer = null

/////////////////////////////////changer valeur du random pour rentrer en combat//////////////
          function startFight(){
              // si le joueur n'est pas sur le chemin
              if(jsonResponse[0].ground[player.strGlobalX][player.strGlobalY][player.localY][player.localX] != 2 && Math.random() < 0.5){
                  console.log("in Fight!")
                  player.inFight = true
                  player.generateEnnemies()
                  for (var i = 0; i < 4; i++) {
                      player.fighter[i].x = 2
                      player.fighter[i].y = 7-i
                  }
                  player.getInfosCombat()
                  menuFight.selected = true
                  selectorMax = menuFight.submenuItems.length
                  player.arrayFighters[player.indexFighterCombat].addMP()
              }
          }


          function drawTileMap() {
            ctx.drawImage(imageBG, 0, 0, CanvasControl().width, CanvasControl().height)
            // Loop through our tiles and draw the map
            for (var i = 0; i < 0 + xrange; i++) {
              for (var j = 0; j < 0 + yrange; j++) {
                tileLayer.draw(i, j)
                if(!player.inFight){
                    if (i === player.localX && j === player.localY) {
                        objectLayer.draw(i, j, fighterImage[0])
                    }
                }else{
                    //color tiles if deplacement
                    if(menuFight.submenuItems[0].selected && player.arrayFighters[player.indexFighterCombat].isAccessible(i,j,  player.arrayFighters[player.indexFighterCombat].job.mobility)){
                        context.globalAlpha = 0.5
                        objectLayer.draw(i, j, moveImage)
                        context.globalAlpha = 1
                    }
                    //color tile if Attack
                    if(menuFight.submenuItems[1].submenuItems[0].selected && player.arrayFighters[player.indexFighterCombat].isAccessible(i, j, player.arrayFighters[player.indexFighterCombat].getAttackRange()) && !(player.arrayFighters[player.indexFighterCombat].x === i && player.arrayFighters[player.indexFighterCombat].y === j)){
                        context.globalAlpha = 0.5
                        objectLayer.draw(i, j, moveImage)
                        context.globalAlpha = 1
                    }
                    if((menuFight.submenuItems[0].selected || menuFight.submenuItems[1].submenuItems[0].selected) && i === selectorMove.x && j === selectorMove.y){
                        objectLayer.draw(i, j, selectorMove.img)
                    }
                    for(var k =0; k<4; k++){
                        if(i === player.fighter[k].x && j === player.fighter[k].y && player.fighter[k].HP > 0){
                            objectLayer.draw(i, j, fighterImage[k])
                        }
                        if(i === player.ennemis[k].x && j === player.ennemis[k].y && player.ennemis[k].HP > 0){
                            objectLayer.draw(i, j, ennemiImages[player.ennemis[k].job.name])
                        }
                    }
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
              if(player.inFight){
                  //TODO: afficher info fighters during fight
                  ctx.strokeStyle = "gray"
                  for (var i = 0; i < player.arrayFighters.length; i++) {
                      ctx.strokeRect(20+55*i, 550, 50, 90)
                      ctx.fillStyle = "white"
                      ctx.fillRect(21+55*i, 551, 48, 88)
                      ctx.fillStyle = "red"
                      ctx.globalAlpha = 0.6
                      ctx.fillRect(21+55*i, 551+88-(player.arrayFighters[i].HP/player.arrayFighters[i].HPMax)*88, 48, (player.arrayFighters[i].HP/player.arrayFighters[i].HPMax)*88)
                      ctx.globalAlpha = 1
                      if(player.arrayFighters[i].name == player.fighter[0].name){
                          ctx.drawImage(fighterImage[0], 20+55*i, 560, 50, 50)
                      }else if(player.arrayFighters[i].name == player.fighter[1].name){
                          ctx.drawImage(fighterImage[1], 20+55*i, 560, 50, 50)
                      }else if(player.arrayFighters[i].name == player.fighter[2].name){
                          ctx.drawImage(fighterImage[2], 20+55*i, 560, 50, 50)
                      }else if(player.arrayFighters[i].name == player.fighter[3].name){
                          ctx.drawImage(fighterImage[3], 20+55*i, 560, 50, 50)
                      }else{
                          ctx.drawImage(ennemiImages[player.arrayFighters[i].job.name], 20+55*i, 560, 50, 50)
                      }
                      ctx.fillStyle = "black"
                      ctx.fillText(player.arrayFighters[i].name, 22+55*i, 620, 46, 50)
                  }
                  ctx.strokeStyle = "black"
                  ctx.strokeRect(19+55*player.indexFighterCombat, 549, 52, 92)
              }
          }



          function drawMenuFight(){
              if(menuFight.selected && !menuFight.submenuItems[0].selected && !menuFight.submenuItems[1].submenuItems[0].selected){
                  ctx.fillStyle="#1111FF"
                  ctx.strokeStyle = "white"
                  ctx.globalAlpha = 0.8
                  ctx.strokeRect(950, 300, 220, 80)
                  ctx.fillRect(951, 301, 218, 78)
                  ctx.strokeRect(950, 400, 220, 250)
                  ctx.fillRect(951, 401, 218, 248)
                  ctx.fillStyle = "white"
                  ctx.font="22px Courier New"
                  ctx.fillText("Name: "+player.arrayFighters[player.indexFighterCombat].name, 970, 328, 180, 40)
                  ctx.fillText("Job: "+player.arrayFighters[player.indexFighterCombat].job.name, 970, 362, 180, 40)
                  if(!menuFight.isSomethingSelected())
                    fillMenuFight(menuFight)
                  else if(menuFight.submenuItems[1].selected)
                      fillMenuFight(menuFight.submenuItems[1])
                  ctx.globalAlpha = 1
              }
          }

          function fillMenuFight(foo){//prend en parametre un menuItem, auto draw & format each subMenu & selector
              var listMenu = foo.submenuItems
              var padding = (300-(2*40))/listMenu.length
              ctx.fillStyle="white"
              ctx.font="22px Courier New"
              $(listMenu).each(function(index, el) {
                  if(el.enabled){
                      ctx.fillStyle="white"
                  }else{
                      ctx.fillStyle="grey"
                  }
                  ctx.fillText(el.name, 1000, 450+padding*index)
              })
              if(!foo.isSomethingSelected()){
                  ctx.fillRect(985, 458+padding*selector, 90, 3)
              }
          }


          function tick(){
              drawTileMap()
              drawPlayerInfo()
              if(player.inFight){
                  drawMenuFight()
              }else{
                  drawMenu()
              }
              if(dammageDisplay)
                dammageDisplay.render(ctx)
              requestAnimationFrame(tick)
          }



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
                    if(menu.submenuItems[1].isSomethingSelected() && !menu.submenuItems[1].submenuItems[selectorFighter].isSomethingSelected()){
                        if(selector == 0){
                            ctx.strokeRect(390, 200, 220, 30)
                        }else{
                            ctx.strokeRect(590, 280+50*(selector-1), 220, 30)
                        }
                    }
                    ////////////AFFICHAGE jobs//////////////
                    if(menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[0].selected){
                        ctx.fillStyle="#1111FF"
                        ctx.strokeRect(619, 199, 202, 252)
                        ctx.fillRect(620, 200, 200, 250)
                        ctx.fillStyle="#FFFFFF"
                        for (var i = 0; i < player.listJob.length; i++) {
                            ctx.fillText(player.listJob[i].name, 630, 225+i*35, 180, 180)
                        }
                        ctx.strokeRect(625, 205+35*selector, 180, 30)
                    }


                    if(menu.submenuItems[1].submenuItems[selectorFighter].isSomethingSelected()){
                        ctx.fillStyle="#1111FF"
                        ctx.strokeRect(619, 199, 202, 252)
                        ctx.fillRect(620, 200, 200, 250)
                        ctx.fillStyle="#FFFFFF"
                        for (var i = 0; i < menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].submenuItems.length; i++) {
                            ctx.fillText(menu.submenuItems[1].submenuItems[selectorFighter].submenuItems[selectorPropertie].submenuItems[i].name, 630, 225+i*35, 180, 180)
                        }
                        ctx.strokeRect(625, 205+35*selector, 180, 30)
                    }
                  }
              }
              ctx.globalAlpha = 1
          }


              function updateLayers(){
                  tileLayer.setup({
                                title: "Ground Layer",
                                layout: jsonResponse[0].ground[player.strGlobalX][player.strGlobalY],
                                graphics: imgResponse[0].files,
                                graphicsDictionary: imgResponse[0].dictionary,
                                isometric: true, // Flag used to layout grid in isometric format
                                tileHeight: 40,
                                tileWidth: 80,
                                heightMap: {
                                map: jsonResponse[0].height[player.strGlobalX][player.strGlobalY],
                                // imgResponse[0] contains the first set of grpahic files[] we placed in the graphics array
                                heightTile: imgResponse[0].files["blockTerrain_1.png"],
                                offset: 0
                                },
                                shadow: {
                                  offset: 40, // Offset is the same height as the stack tile
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
                    tileHeight: 40,
                    tileWidth: 80,
                    heightMap: {
                      map: jsonResponse[0].height[player.strGlobalX][player.strGlobalY],
                      offset: 40,
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
                          tileHeight: 40,
                          tileWidth: 80,
                          heightMap: {
                          map: jsonResponse[0].height[player.strGlobalX][player.strGlobalY],
                          // imgResponse[0] contains the first set of grpahic files[] we placed in the graphics array
                              heightTile: imgResponse[0].files["blockTerrain_1.png"],
                          offset: 0
                          },
                          shadow: {
                            offset: 40, // Offset is the same height as the stack tile
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
              tileHeight: 40,
              tileWidth: 80,
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
            tick()
      })
      })
    })
    }


}
