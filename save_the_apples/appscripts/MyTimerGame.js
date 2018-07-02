require(
	[],
	function () {
            
        console.log("yo, I'm alive!");

        // First prompt
        var prompt = window.confirm("Ready to play?");

        // If user decides to play
        if (prompt == true){
        // background music
        var startSound = new Audio("./sounds/guitar.wav");

        startSound.loop = true;

        // To implement background sound later on
        // startSound.play();

        var paper = new Raphael(document.getElementById("mySVGCanvas"));

        // Get paper dimensions
        var dimX = paper.canvas.clientWidth;
        var dimY = paper.canvas.clientHeight;


        //------------------------------------------
        // Create a rectangle with the same dimensions as the canvas and save it in the variable bg
        var bg = paper.rect(0, 0, dimX, dimY);

        // Set some background rectangle attributes
        bg.attr({
                "stroke": "#000000",
                "stroke-width": 0,
                "fill" : "#FFFFFF"        // must be filled to get mouse clicks        
        });

        // Add mousedown listener that prints to console 
        bg.node.addEventListener("mousedown", function(ev){
                console.log("mouse down on paper")
        });

        // Supermarket background
        var superMart = paper.image('./images/aisle_1.jpg', 0, 0, dimX, dimY).attr({
            'opacity' : 1.0,
        });

        // Shopping basket
        var basket = paper.image('./images/Shopping-Basket.png', 650, 400, 400, 375);

        // Create variables
        var countdown = 20;

        var displayBG = paper.rect(550, 10, 100, 80, 10).attr({
            "fill" : "white",
            "opacity" : 0.3,
            "stroke" : "gray",
        })

        // countdown display
        var display = paper.text(600, 50, countdown).attr({
          "font-size" : 60,
          "fill" : "black",
          "font-weight" : "bold",});

        // ticker for game time countdown
        var ticker = function(){
            if (countdown > 0) {
                countdown = countdown - 1;
                display.attr({
                "text" : countdown,
                "font-size" : 60,
                "fill" : "black",
                "font-weight" : "bold",});
            };
        };

        var score = 0;

        // shelf where the apples will bounce arround
        var shelf = paper.rect(100, 150, 400, 550, 10).attr({
            "fill" : "white",
            "opacity" : 0.8,
            "stroke-width" : 15,
            "stroke" : "brown",
        });

        var appleNum = 15;  

        var mouseState = 0;

        var manyApples = []; 

        var i = 0;

        // Create apples
        var createApples = function(){
            while (i < appleNum) {
            manyApples[i] = paper.image('./images/apple_color.png', 300, 425, 50, 50);
            
            manyApples[i].xpos= 300;
            manyApples[i].ypos= 425;
            // randomize movement of apples
            manyApples[i].xrate= Math.floor(Math.random() * 20) - 10;
            manyApples[i].yrate= Math.floor(Math.random() * 20) - 10;
            manyApples[i].node.addEventListener('click', function(ev){
                score++;
                console.log(score);
                paper.image('./images/apple_color.png', (750+Math.random()*200), (500+Math.random()*150), 50, 50);
            })
            i++;
            console.log("The number of apples is now " + i);
            };
        };

        createApples();

        // Move apples
        var count = 0;

        var draw = function(){
            // Count and keep track of the number of times this function is called
            count++;
            console.log("count = " + count);

            // re-initialise i to 0
            i = 0;
            while (i < appleNum) {

            // Update the position of apples
            manyApples[i].xpos += manyApples[i].xrate;
            manyApples[i].ypos += manyApples[i].yrate;

            // Now actually move the apples using our 'state' variables
            manyApples[i].attr({'x': manyApples[i].xpos, 'y': manyApples[i].ypos});
            
            // keep apples in shelf boundaries
            if (manyApples[i].xpos > (500 - 40)) {manyApples[i].xrate = - manyApples[i].xrate;}
            if (manyApples[i].ypos > (700 - 40)) {manyApples[i].yrate = - manyApples[i].yrate};
            if (manyApples[i].xpos < (100 + 10)) {manyApples[i].xrate = - manyApples[i].xrate;}
            if (manyApples[i].ypos < (150 + 10)) (manyApples[i].yrate = - manyApples[i].yrate);
            
            i++; 
        };
        };

        // Set draw function to run till to game end 
        setInterval(draw, 20);

        // Set interval for ticker display
        setInterval(ticker, 1000);

        var fin = setTimeout(function(){
            var end = confirm("Your score is " + score + ". " + "Want to play again?");
            if (end == true){
                // Reload game
                location.reload()
            } else {
                // Show ending screen
                var endbg = paper.rect(0, 0, dimX, dimY);
                endbg.attr({
                    "stroke": "#000000",
                    "stroke-width": 0,
                    "fill" : "#FFFFFF"                
                });
                var end = "You may now close the window!";
                var endtext = paper.text(dimX/2, dimY/2, end).attr({
                    "font-size": 60,
                    "font-family": "Courier New",
                });
            }

        }, 21000);

        } else {
            var paper = new Raphael(document.getElementById("mySVGCanvas"));
            // Get paper dimensions
            var dimX = paper.canvas.clientWidth;
            var dimY = paper.canvas.clientHeight;

            // Show ending screen
            var endbg = paper.rect(0, 0, dimX, dimY);
            endbg.attr({
                "stroke": "#000000",
                "stroke-width": 0,
                "fill" : "#FFFFFF"                
            });
            var end = "You may now close the window!";
            var endtext = paper.text(dimX/2, dimY/2, end).attr({
                "font-size": 60,
                "font-family": "Courier New",
            });
        }

        });  