/****** Objects to represent animations */

var gravity = { 
	name: 'gravity',
	totalFrames: 1,
	loop: false,
	step: 20,
	width: 52,
	height: 75,
	sY: 152,
	sX: 0
};

var standRight = { 
	name: 'standRight', 
	totalFrames: 1,
	loop: false, //set to true for animation to loop automatically
	step: 20, //# of frames before animation advances - controls animation speed
	width: 52,
	height: 75,
	sY: 152, //Y offset for where animation is located in source file
	sX: 0  //X offset for where animation is located in source file
};

var standLeft = { 
	name: 'standLeft',
	totalFrames: 1,
	loop: false,
	step: 20,
	width: 52,
	height: 75,
	sY: 152,
	sX: 52
};

var walkRight = { 
	name: 'walkRight',
	totalFrames: 6,
	loop: true,
	step: 4,
	width: 52,
	height: 75,
	sY: 0,
	sX: 0
};

var walkUp = { 
	name: 'walkUp',
	totalFrames: 6,
	loop: true,
	step: 4,
	width: 52,
	height: 75,
	sY: 0,
	sX: 0
};

var walkDown = { 
	name: 'walkDown',
	totalFrames: 6,
	loop: true,
	step: 4,
	width: 52,
	height: 75,
	sY: 0,
	sX: 0
};

var walkLeft = { 
	name: 'walkLeft',
	totalFrames: 6,
	loop: true,
	step: 4,
	width: 52,
	height: 75,
	sY: 75,
	sX: 0
};


/*** function to create and then return a new Sprite object */
function newSprite(){
	var Sprite = {
		canvas: 0, //canvas to hold this sprite - will be drawn to main canvas
		ctx: 0, //context for sprite canvas
		x: 0, // X position of this sprite
		y: 0, //Y position of this sprite
		animation: 0, //current animation for this sprite
		currentFrame: 0, //current animation frame for this sprite
		width: 0, 
		height: 0,
		image: 0, //image that is being drawn to the canvas
		currentStep: 0, //number of frames since this sprite's animation was updated
		is_ready: 0, //sprite has finished loading and can be used
		initSprite: function(canvas, x, y, width, height, img_file){ //initialize sprite
			Sprite.is_ready = false; //sprite not ready
			Sprite.x = x;
			Sprite.y = y;
			Sprite.width = width;
			Sprite.height = height;
			Sprite.canvas = canvas; //canvas is created by Eperiment object and passed to sprite
			Sprite.canvas.setAttribute('width', width);
			Sprite.canvas.setAttribute('height', height);
			Sprite.ctx = Sprite.canvas.getContext('2d'); //get canvas drawing context
			Sprite.loadImage(img_file); // load image for sprite
			Sprite.animation = gravity; //set initial animation set
		},
		loadImage: function(img_file){  //loads image to draw for sprite
			Sprite.image = new Image();  //create new image object
			Sprite.image.onload = function(){  //event handler for image load 
				Sprite.is_ready = true; // sprite is ready when image is loaded
			}
			Sprite.image.src = img_file; //load file into image object
		},
		drawImage: function(){ //draw image into sprite canvas
			Sprite.ctx.clearRect(0,0,Sprite.width,Sprite.height); //clear previous frame
			if(Sprite.is_ready){ //do not draw if sprite is not ready
				//calculate values for sprite based on animation
				var srcX = Sprite.animation.sX + (Sprite.currentFrame * Sprite.animation.width);
				var srcY = Sprite.animation.sY ;
				var srcWidth = Sprite.animation.width;
				var srcHeight = Sprite.animation.height;
				Sprite.ctx.drawImage(Sprite.image, srcX, srcY, srcWidth, srcHeight, 0, 0, srcWidth, srcHeight); //draw image
				Sprite.stepSprite(); //advance animation
				Sprite.moveSprite(); //move sprite
			}
		},
		stepSprite: function(){ //advance animation based on animation speed (step value)
			if(Sprite.currentStep >= Sprite.animation.step){
				Sprite.currentStep = 0;
				Sprite.currentFrame++;
				if(Sprite.currentFrame >= Sprite.animation.totalFrames){ 
					if(Sprite.animation.loop){
						Sprite.currentFrame = 0; //loop animation back to start
					}
					else{
						Sprite.currentFrame = Sprite.animation.totalFrames -1;	//if loop not set, hold on final frame
					}
				}
			}
			else {
				Sprite.currentStep++; //advance step counter if step limit not reached	
			}
		},
		/*Temporary move functions to move demo sprites.  Ideally this code will be handled outside the Sprite object, so Sprite can focus soley on drawing and animation*/
		moveSprite: function(){
			if(Sprite.animation.name == walkRight.name){
				Sprite.x += 5;
				if(Sprite.x > Experiment.width)
				{
					Sprite.x = 0 - Sprite.width;
				}
			}
			else if(Sprite.animation.name == walkLeft.name){
				Sprite.x -= 5;
				if((Sprite.x + Sprite.width)  < 0 )
				{
					Sprite.x = Experiment.width;
				}
			}
			else if(Sprite.animation.name == walkUp.name){
				Sprite.y -= 5;
				if((Sprite.y + Sprite.height)  < 0 )
				{
					Sprite.y = Experiment.height;
				}
			}
			else if(Sprite.animation.name == walkDown.name){
				Sprite.y += 5;
				if(Sprite.y > Experiment.height)
				{
					Sprite.y = 0 - Sprite.height;
				}
			}
			else if(Sprite.animation.name == gravity.name){
				Sprite.y += 10;
				if(Sprite.y + Sprite.height > Experiment.height)
				{
					Sprite.y = Experiment.height - Sprite.height;
				}
			}
		},
		goLeft: function(){
			if(Sprite.animation.name != walkLeft.name){
				Sprite.animation = walkLeft;
				Sprite.currentFrame = 0;
				Sprite.currentStep = 0;
			}
		},
		goRight: function(){
			if(Sprite.animation.name != walkRight.name){
				Sprite.animation = walkRight;
				Sprite.currentFrame = 0;
				Sprite.currentStep = 0;
			}
		},
		goUp: function(){
			if(Sprite.animation.name != walkUp.name){
				Sprite.animation = walkUp;
				Sprite.currentFrame = 0;
				Sprite.currentStep = 0;
			}
		},
		goDown: function(){
			if(Sprite.animation.name != walkDown.name){
				Sprite.animation = walkDown;
				Sprite.currentFrame = 0;
				Sprite.currentStep = 0;
			}
		},
		gravity: function(){
		    console.log( "gravity" );
			if(Sprite.animation.name != gravity.name){
				Sprite.animation = gravity;
				Sprite.currentFrame = 0;
				Sprite.currentStep = 0;
			}
		},
		stopMovement: function(){
			if(Sprite.animation.name == walkLeft.name)
			{
				Sprite.animation = standLeft;
				Sprite.currentFrame = 0;
				Sprite.currentStep = 0;
			}
			else if(Sprite.animation.name == walkRight.name){
				Sprite.animation = standRight;
				Sprite.currentFrame = 0;
				Sprite.currentStep = 0;
			}
			else if(Sprite.animation.name == walkUp.name){
				Sprite.animation = standRight;
				Sprite.currentFrame = 0;
				Sprite.currentStep = 0;
			}
			else if(Sprite.animation.name == walkDown.name){
				Sprite.animation = standLeft;
				Sprite.currentFrame = 0;
				Sprite.currentStep = 0;
			}
			
	        else if(Sprite.animation.name == gravity.name){
				Sprite.animation = standLeft;
				Sprite.currentFrame = 0;
				Sprite.currentStep = 0;
			}
		}
	};
	return Sprite;  //returns newly created sprite object
};

var Foreground = { //stripped down Sprite object to represent the foreground
	canvas: 0,
	ctx: 0,
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	image: 0,
	is_ready: 0,
	initForeground: function(canvas, x, y, width, height, img_file){
		Foreground.is_ready = false;
		Foreground.x = x;
		Foreground.y = y;
		Foreground.width = width;
		Foreground.height = height;
		Foreground.canvas = canvas;
		Foreground.canvas.setAttribute('width', width);
		Foreground.canvas.setAttribute('height', height);
		Foreground.canvas.className = 'Foreground';
		Foreground.ctx = Foreground.canvas.getContext('2d');
		Foreground.loadImage(img_file);
	},
	loadImage: function(img_file){
		Foreground.image = new Image();
		Foreground.loading = true;
		Foreground.image.onload = function(){
			Foreground.is_ready = true;
		}
		Foreground.image.src = img_file;
	},
	drawImage: function(){
		// Foreground.ctx.clearRect(0,0,Foreground.width,Foreground.height);
		if(Foreground.is_ready){
			Foreground.ctx.drawImage(Foreground.image, 0, 0);
		}
	}
}

var Experiment = { //main canvas and demo container
	canvas: 0, //main canvas object
	ctx: 0, //main canvas drawing context
	sprite: 0, //sprite object
	sprite2: 0, //2nd sprite object sprite object
	width: 0,
	height: 0,
	timer: 0,  //hold reference to game loop timer
	background: 0, //background image - for now is drawn right onto main canvas which is not ideal
	foreground: 0, //foreground object
	init: function( width, height){ //initialize experiment
	    Experiment.width = width;
	    Experiment.height = height;
		Experiment.canvas = document.getElementById('main');  //get canvas element from html
		Experiment.ctx = Experiment.canvas.getContext('2d'); //create main drawing canvas
		Experiment.canvas.setAttribute('width', Experiment.width); //set attributes of canvas
		Experiment.canvas.setAttribute('height', Experiment.height);
		var new_canvas = document.createElement('canvas'); //create new canvas to pass to sprite
		Experiment.sprite = newSprite(); //create new Sprite object
		Experiment.sprite.initSprite(new_canvas,440, Experiment.height, 52, 75, 'images/gb_walk2.png'); //init sprite
		
		new_canvas = document.createElement('canvas'); //create new canvas to pass to sprite
		Experiment.sprite2 = newSprite(); //create new Sprite object
		Experiment.sprite2.initSprite(new_canvas,440, 265, 52, 75, 'images/gb_walk2.png'); //init sprite
		Experiment.sprite2.goLeft(); //set animation for second sprite


		Experiment.background = new Image(); //load background
		Experiment.background.ready = false; 
		Experiment.background.onload = function(){
			Experiment.background.ready = true;
			Experiment.timer = setInterval(Experiment.drawFrame, 40); //set up improvised game loop at 25 FPS (1000/40 = 25)
		}
		Experiment.background.src = ('images/back.gif');
		
		//create foreground and init
		var fore_canvas = document.createElement('canvas');
		Experiment.foreground = Foreground;
		// Experiment.foreground.initForeground(fore_canvas, 0,0,997,450, 'images/fore.png');	
	},
	
	drawFrame: function(){ //main drawing function
		Experiment.ctx.clearRect(0,0,Experiment.width, Experiment.height);  //clear main canvas
		// Experiment.ctx.drawImage(Experiment.background, 0, 0); // draw canvas background
		Experiment.ctx.fillStyle = 'transparent';
		Experiment.ctx.fillRect(0, 0, Experiment.width, Experiment.height);
		if(Experiment.sprite){  //if sprite exists
			Experiment.sprite.drawImage(); //cause sprite to draw itself on its internal canvas
			Experiment.ctx.drawImage(Experiment.sprite.canvas, Experiment.sprite.x, Experiment.sprite.y);//draw sprite canvas onto main canvas
		}

		/*if(Experiment.sprite2){
			Experiment.sprite2.drawImage();
			Experiment.ctx.drawImage(Experiment.sprite2.canvas, Experiment.sprite2.x, Experiment.sprite2.y);
		}*/


		// Experiment.foreground.drawImage(); //draw foreground image onto foreground internal canvas
		// Experiment.ctx.drawImage(Experiment.foreground.canvas, 0, 0); //draw foreground on main canvas - is drawn last so will be drawn on top of other canvases
	}
	
};

var ParentDoc = { //The HTML Page
	width: document.body.clientWidth-2,
	height: document.body.clientHeight+200,
	climbingElements: new Array(),
	
	init: function(){ //initialize parentDoc
	    ParentDoc.timer = setInterval('ParentDoc.checkForOverlap();', 40); //set up improvised game loop at 25 FPS (1000/40 = 25)
	    // alert( this.width );
	},
	addClimbingElement: function( element ) {
	    this.climbingElements.push( element );
	},
	checkForOverlap: function( x, y ) {
	    // console.log("check");
	    var els = this.climbingElements;
	    var spriteTop = Experiment.sprite.y;
	    var spriteRight = Experiment.sprite.x + Experiment.sprite.width ;
	    var spriteBottom = Experiment.sprite.y + Experiment.sprite.height;
	    var spriteLeft = Experiment.sprite.x ;
	    
	    for ( var a in els ) {
	        var el = els[a];
	        if ( spriteLeft <= el.right && spriteRight >= el.left  && spriteTop <= el.bottom && spriteBottom >= el.top  ) {
	            el.element.addClass("over");
	            ParentDoc.moveSpriteOutside( el, spriteTop, spriteRight, spriteBottom, spriteLeft );
	        }
	    }
	    return true;
	},
	moveSpriteOutside: function( el, top, right, bottom, left) {
	    if ( el.top <= bottom && el.bottom > bottom && el.left < right && el.right > left && el.bottom > top && el.top > bottom-15  ) {
	        Experiment.sprite.y = el.top - (Experiment.sprite.height+1);
	        Experiment.sprite.stopMovement();        
	        console.log( "top" );
	        console.log( el.top +"|"+ bottom );
	        return true;
	    }
	    if ( el.bottom >= top && el.top < top && el.left < right && el.right > left && el.bottom <= top+5 ) {
	        Experiment.sprite.y = el.bottom+1;
	        Experiment.sprite.gravity();
	        console.log( "bottom" );
	        return true;
	    }
	    if ( el.right >= left && el.left < right && el.top < bottom && el.bottom >= top && el.left < left  ) {
	        Experiment.sprite.x = el.right+1;
	        Experiment.sprite.stopMovement();
	        console.log( "right" );
	        console.log( el.top +"|"+ bottom );
	        return true;
	    }
	    if ( el.left <= right  && el.right > right && el.top < bottom && el.bottom > top && el.bottom > top ) {
	        Experiment.sprite.x = el.left-(Experiment.sprite.width+1);
	        // alert( right-left );
	        console.log( "left" );
	        Experiment.sprite.stopMovement();
	        return true;
	    }
	    
	    
	}
};
ParentDoc.init();
// alert( ParentDoc.width );
Experiment.init( ParentDoc.width, ParentDoc.height );  //initialize main Expermient object


// using jQuery
$(document).ready( function() {
    $(document).bind("keypress", function(e) {
        
        var code = (e.keyCode ? e.keyCode : e.which);
        // console.log( code );
        if ( code == 97 ) {
            Experiment.sprite.goLeft();
        }
        if ( code == 119 ) {
            Experiment.sprite.goUp();
        }
        if ( code == 100 ) {
            Experiment.sprite.goRight();
        }
        if ( code == 115 ) {
            Experiment.sprite.goDown();
        }
       /* if ( code == 32 ) {
            Experiment.sprite.stopMovement();
        }*/
    });
    
    $(document).bind("keyup", function(e) {
         Experiment.sprite.gravity();
    });
    
    // set up elements
    $("#text").find("p").each( function() {
       $(this).css("border","1px dashed #FF0000");
       var elPosition = $(this).position();
       var thisEl = {
           top: elPosition.top,
           bottom:  elPosition.top + $(this).height(),
           left:  elPosition.left,
           right:  elPosition.left + $(this).width(),
           type: $(this)[0].nodeName,
           element: $(this)
       }
       $(this).append( thisEl.top );
       ParentDoc.addClimbingElement( thisEl );
    });
    $("#main").css("visibility","hidden");
    var element = document.elementFromPoint(100, 100);
    // alert( element.innerHTML );
    $("#main").css("visibility","visible");
    
    for ( var a in ParentDoc.climbingElements ) {
        // alert( ParentDoc.climbingElements[a].element.innerHTML ); 
    }
});
