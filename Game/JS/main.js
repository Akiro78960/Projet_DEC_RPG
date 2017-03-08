var ctx = null

window.onload = function(){
    ctx = document.getElementById("canvas").getContext("2d")


    var iso = new Isomer(document.getElementById("canvas"), {
      scale: 25,
    });
    var Shape = Isomer.Shape;
    var Color = Isomer.Color;
    var Point = Isomer.Point;
    var Path = Isomer.Path;

    var brick = new Color(180, 180, 180);
    var i;

    var base = Shape.Prism(Point.ORIGIN, 20, 10, 3);
    iso.add(base, brick);
    iso.add(Stairs(Point(0, -1, 0), 7).scale(Point.ORIGIN, 20, 3, 3), brick);
    iso.add(Stairs(Point(-1, -1, 0), 7)
              .rotateZ(Point.ORIGIN, -Math.PI/2)
              .scale(Point.ORIGIN, 3, 10, 3), brick);

    for (i = 0; i < 11; i++) {
      iso.add(Shape.Prism(Point(1.9*i + 0.2, 0.2, 3), 0.6, 0.6, 0.1), brick);
      iso.add(Shape.Prism(Point(1.9*i + 0.2, 9.2, 3), 0.6, 0.6, 0.1), brick);

      iso.add(Shape.Cylinder(Point(1.9*i + 0.5, 0.5, 3.1), 0.25, 10, 4), brick);
      iso.add(Shape.Cylinder(Point(1.9*i + 0.5, 9.5, 3.1), 0.25, 10, 4), brick);
    }

    var roof = Stairs(Point(0, 0, 7.1), 7).scale(Point(0, 0, 7.1), 20, 5, 3);

    iso.add(roof.rotateZ(Point(10, 5, 7.1), Math.PI), brick);
    iso.add(roof, brick);




    function Stairs(origin, stepCount) {
      stepCount = stepCount || 10;

      /* Create a zig-zag */
      var zigzag = new Path(origin);
      var steps = [], i;

      /* Shape to return */
      var stairs = new Shape();

      for (i = 0; i < stepCount; i++) {
        /**
         *  2
         * __
         *   | 1
         */

        var stepCorner = origin.translate(0, i / stepCount, (i + 1) / stepCount);
        /* Draw two planes */
        steps.push(new Path([
          stepCorner,
          stepCorner.translate(0, 0, -1 / stepCount),
          stepCorner.translate(1, 0, -1 / stepCount),
          stepCorner.translate(1, 0, 0)
        ]));

        steps.push(new Path([
          stepCorner,
          stepCorner.translate(1, 0, 0),
          stepCorner.translate(1, 1 / stepCount, 0),
          stepCorner.translate(0, 1 / stepCount, 0)
        ]));

        zigzag.push(stepCorner);
        zigzag.push(stepCorner.translate(0, 1 / stepCount, 0));
      }

      zigzag.push(origin.translate(0, 1, 0));


      for (i = 0; i < steps.length; i++) {
        stairs.push(steps[i]);
      }
      stairs.push(zigzag);
      stairs.push(zigzag.reverse().translate(1, 0, 0));

      return stairs;
    }




    /*require.config({
        paths: {
            'control': 'jsiso/canvas/Control',
            'field' : 'jsiso/tile/Field',
            'domready' : 'requirejs/domReady'
        }
    });


    require(['control','field','domready'],fonction)*/
}


function tick(){
    console.log("tick");
    ctx.fillRect(0,0,20,20)
    window.requestAnimationFrame(tick)
}
/*
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
     var context = ctx

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
*/
