var ship;
var shipImage;

var asteroids = [];
var lasers = [];
var laserImage;

function preload() {
   shipImage = loadImage('ship.gif'); 
   laserImage = loadImage('bullet.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  ship = new Ship();
  for(var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid()); 
  }
}

function draw() {
  background(0);
  
  for(var i = 0; i < asteroids.length; i++) {
      //Check if asteroid has hit player  
      asteroids[i].render();
      asteroids[i].update();
      asteroids[i].edges();
  }
  
  
  for(var i = lasers.length  - 1; i >= 0; i--) {
     lasers[i].render();
     lasers[i].update();
     if(lasers[i].offscreen()) {
       lasers.splice(i, 1);
     } else {
       for(var j = asteroids.length - 1; j >= 0; j--) {
         if(lasers[i].hits(asteroids[j])) {
           if(asteroids[j].r > 10) {
             var newAsteroids = asteroids[j].breakup();
             asteroids = asteroids.concat(newAsteroids);
           }
           asteroids.splice(j,1);
           lasers.splice(i,1);
           break;
         }
       }
     }
  }
  
  
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

function keyPressed() {
 if(key == ' ') {
   lasers.push(new Laser(ship.pos, ship.heading)); 
 }
 if(keyCode == RIGHT_ARROW) {
  ship.setRotation(0.1); 
 } else if (keyCode == LEFT_ARROW) {
  ship.setRotation(-0.1)
 } 
 if (keyCode == UP_ARROW) {
  ship.setBoost(true); 
 }
}

function keyReleased() {
  if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
   ship.setRotation(0); 
  }
  if (keyCode == UP_ARROW) {
   ship.setBoost(false);
  }
}