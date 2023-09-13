
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


var engine,world;
var bg;
var player, playerImg, launchSound, warning;
var op1;
var b1, b2;
var bg_img, blast, upBg;
var time=0;
var angle=0;
var isDestroyed= false;
var isFlying= false;
var isUp= false;
var isGround= true;
var explode, blastSound, played= false;
var isCrashing= false;
var user, pass, sub;
var data = [];
var isSpace= false;
var space, downFromSpace= false;
var meteorite,met2, meteoriteVisible= false, metImg;
var isMoon= false, moonBg;
var orbiter,rover,rope,a1,a2, obImg, roverImg;
var isLanded= false;
var point, isFailed= false;
var win;

var instMode= "START";
var moveMoon;



function preload(){
  playerImg= loadAnimation("rocket.gif");
  bg_img= loadImage("back.jpg");
  blast= loadAnimation("blast.gif");
  upBg= loadImage("upback.jpg");
  space= loadImage("space.jpg");
  roverImg= loadAnimation("rov.gif");
  metImg= loadImage("met.gif");
  obImg= loadImage("nasa.gif");
  moonBg= loadImage("moon.jpg");
  blastSound= loadSound("explosion.wav");
  launchSound= loadSound("launch.wav");
  warning= loadSound("warn.mp3");
  win= loadSound("win.wav");
  moveMoon=  loadSound("moveMoon.mp3");

    blastSound.isPlaying= true;
    blastSound.looping= false;
    launchSound.isPlaying= true;
    launchSound.looping= false;
    warning.isPlaying= false;
    warning.looping= false;
}


function setup() {
  createCanvas(windowWidth-7, windowHeight-7);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

 
   op1= {
    isStatic:true
 }

 player= createSprite(650, 644, 10,10, angle );
 player.addAnimation("go", playerImg);
 player.addAnimation("boom", blast);
 player.changeAnimation("go");
 player.setCollider("rectangle",0,0,1,0);
 //player.debug= true;
 player.scale= 0.8;
 
 b1= createSprite(678, 645, width, 10);
 b1.visible= false;

 explosion = createSprite(0, 0);
 explosion.addAnimation("blast", blast);
 explosion.visible = false;

 b2= createSprite(678, 5, width, 10);
 b2.visible= false;

 if(isGround===true && isUp===true){
  bg= image(bg_img, 670, 310, windowWidth, windowHeight);
  player.y= 15;
 }

//  user= createInput();
//  user.position(550, 150);
//  user.style('display', 'none');

//  pass= createInput();
//  pass.position(550, 180);
//  pass.style('display', 'none');

//  sub= createButton("SUBMIT");
//  sub.position(600, 220);
//  sub.mouseClicked(handleData);
//  sub.style('display', 'none');

 var op= {
  isStatic: true
 }


  orbiter= new Satellite(0,0,0,0);
  //orbiter.style('display', 'none');
  rover= createSprite(350, 250,20,20);
  rover.addAnimation("flyRover", roverImg);
  rover.scale= 0.2;
  rover.visible= false;
 
 // rope =createSprite()
//  Matter.Composite.add(rope,rover);
  //at2= new Link(rope.body,rover);

// rover= new Satellite
 

 //at1= new Link(rope,orbiter);

 point= createSprite(550,610,50,50);
 point.addAnimation("point", obImg);
 point.scale= 0.2;
 point.visible= false;


 meteorite = Bodies.rectangle(Math.round(random(200, 450)), 50, 20, 20, op);
 World.add(world, meteorite);

 met2=  Bodies.rectangle(Math.round(random(750, 450)), 50, 20, 20, op);
 World.add(world, met2);
}



function draw() 
{
  background(51);
   Engine.update(engine);
   rectMode(CENTER);
   imageMode(CENTER);
   
   
   player.velocityY+= 0.8;
   

 

   console.log(meteorite.position.x);

  
   if (!isUp && !isSpace && !isMoon) {
    bg = image(bg_img, 670, 310, windowWidth, windowHeight);
  } else if (isUp && isGround) {
    bg = image(bg_img, 670, 310, windowWidth, windowHeight);
  }
  else if(isSpace){
    bg = image(space, 670, 310, windowWidth, windowHeight);
  }
  else if(isMoon){
    bg = image(moonBg, 670, 310, windowWidth, windowHeight);
  }
  else if(isUp) {
    bg = image(upBg, 670, 310, windowWidth, windowHeight);
  }

  if(instMode==="START" && isGround===true){
    textSize(20);
    fill("black");
    text("Press up arrow key to move rocket up.", 100,100);
    text("As soon as the rocket fly, it will start rotating in right direction.", 450, 100);
    text("Press Left arrow key to maintain balance of rocket.", 100, 150);
    text("4 Stages are: GROUND, ATMOSPHERE , SPACE and MOON", 550,150);
    text("As you enter space, a meteorite will come towards you, try to escape or rocket will crash.", 100,200);
    text("Press 'C' To play", 600, 300);

    if(keyDown("C") || keyDown("c")){
      instMode= "MOON";
    }
  }

 
  meteorite.depth= space.depth;
  meteorite.depth+=1;
 

 //rect(rope.position.x, rope.position.y,20,150)
  
  if(isSpace){
    meteoriteVisible= true;
  }

 
var ran= frameCount;

if(ran%30===0 && isMoon===true && !isFailed && instMode!=="MOON"){
  point.x= Math.round(random(100, 800));
}
 
 var edge=  createEdgeSprites();
  rover.bounceOff(edge);
 // point.bounceOff(edge);

// if(point.x> 20){
//   point.velocityX= -3
// }
// else{
//   point.velocityX= -3;
// }
 

  if(!isDestroyed && instMode!=="START"){

    downFromSpace= true;

    if(keyIsDown(UP_ARROW) && !isCrashing ){
     player.velocityY= -5;
     time+=0.1;
    // console.log(time);
 
     isFlying= true;
     launchSound.play();
     launchSound.setVolume(0.08);
    }

    if(isCrashing=== true ){
        launchSound.stop();
      }
 
    if(angle>=90 || angle<=-90 ){
    // console.warn("WARNING, ROCKET FALL");
     player.velocityY=20;
 
     textSize(40);
     fill("black");
     text("ROCKET HAS CROSSED ANGLE LIMIT!!", 300,300);

     isCrashing= true;
     warning.play();
     warning.setVolume(0.02);
    }

 
    if(angle>=30 || angle<=-30 && angle<90 || angle<-90 ){
     textSize(30);
     fill("black");
     text("PLEASE HANDLE THE ROCKET!", 400, 100);
    }
 
    if(keyIsDown(LEFT_ARROW)&& angle<=90&& isFlying===true && isGround===true || isUp===true){
     player.rotation -= 1;
       player.display(); 
 
       angle-=1;
    }
 
   }
   if(isFlying===true && time>=1 && isDestroyed===false && !keyIsDown(LEFT_ARROW) ){
       
       // push(); 
       // translate(player.position.x, player.position.y); 
       player.rotation += 1;
       player.display(); 
       // pop(); 
 
       angle+=1;
 
   }

  // console.log(player.y);
 
    if(time>=1 && player!==null && player.isTouching(b1)&& isGround===true && !isMoon){
      isDestroyed= true;
     player.velocityY= 3;
     b1.y= 650;
     explosion.position.x = player.position.x;
     explosion.position.y = player.position.y;
     explosion.visible = true;
     explosion.changeAnimation("blast");
     explosion.scale= 20;
     player.visible = false; 

     warning.stop();
     launchSound.stop();
     
 
     if(played===false){
 
     blastSound.play();
     played= true;
     }
 
     textSize(40);
     fill("black");
 
    // text("ROCKET CRASHED!", 420, 300);
    crashed();

     
    
     
    }

    if(player.isTouching(b2) && !isUp){
      isUp= true;
      player.y= 625;
     }
 
 
    if(isUp===true){
     bg= image(upBg, 670,310,windowWidth, windowHeight);
     downFromSpace= true;

    // var pos= player.y;

     isGround= false;
     
     player.velocityY+=0.8

     if(keyIsDown(UP_ARROW)  && !isCrashing ){
      player.velocityY= -10;
      time+=0.1;
     // console.log(time);
  
      isFlying= true;
      launchSound.play();
      launchSound.setVolume(0.08);
     }

     if(isCrashing=== true ){
      launchSound.stop();
    }

    //  if(isFlying=== true && isDestroyed===false ){

    //  }

     player.depth= upBg.depth;
     player.depth+=1;

     if(angle>=90 && isDestroyed===false || angle<=-90 && isDestroyed===false){
     // console.warn("WARNING, ROCKET FALL");
      player.velocityY= 20;

      isCrashing= true;
  
      textSize(40); 
      fill("black");
      text("ROCKET HAS CROSSED ANGLE LIMIT!!", 300,300);

      warning.play();
      warning.setVolume(0.02);
     }
  
     if(angle>=30 || angle<=-30 && angle<90  && isDestroyed===false){
      textSize(30);
      fill("black");
      text("PLEASE HANDLE THE ROCKET!", 400, 100);
     }

     if(time>=1 && player.isTouching(b1)){
     isGround= true;
      isUp= false;
     }

     if(isGround===true){
      player.y=15;
     }

     if(isFlying===true && time>=1 && isDestroyed===false && !keyIsDown(LEFT_ARROW)  ){
       
      // push(); 
      // translate(player.position.x, player.position.y); 
      player.rotation += 1;
      player.display(); 
      // pop(); 

      angle+=1;

  }

  if( player.isTouching(b2) &&!isDestroyed && isFlying===true && !isSpace && isUp===true && !isGround ){
    isSpace=true;
    player.y= 625;
  }

  if( isSpace===true  ){
    bg= image(space, 670,310,windowWidth, windowHeight);
    downFromSpace= false;

    if(angle>=90 && isDestroyed===false || angle<=-90 && isDestroyed===false){
      // console.warn("WARNING, ROCKET FALL");
       player.velocityY= 5;
 
       isCrashing= true;
   
       textSize(40); 
       fill("white");
       text("ROCKET HAS CROSSED ANGLE LIMIT!!", 300,300);
 
       warning.play();
       warning.setVolume(0.02);
      }
   
      if(angle>=30 || angle<=-30 && angle<90 && isDestroyed===false){
       textSize(30);
       fill("white");
       text("PLEASE HANDLE THE ROCKET!", 400, 100);
      }

      if(keyIsDown(RIGHT_ARROW)){
        player.x+=10;
      }

    if(keyIsDown(LEFT_ARROW)){
      player.x-=10;
    }
 
      if(time>=1 && player.isTouching(b1)  ){
      
        downFromSpace= true;
      }

      if(downFromSpace===false && !isUp){
       
        isSpace= false;
        isUp= true;

      }

      
     
      
      
  }

   // reachedMoon();

 
}


  // console.log(isMoon);ss
  // console.log(b2.x);
    
  setMoon();
   player.collide(b1);
   reachedMoon();
  
   //rotate(player);

   if(checkCollision(meteorite, player, 80)===true && isSpace===true){
    isDestroyed= true;
     player.velocityY= -5;
     
     b1.y= 650;
     explosion.position.x = player.position.x;
     explosion.position.y = player.position.y;
     explosion.visible = true;
     explosion.changeAnimation("blast");
     explosion.scale= 20;
     player.visible = false; 

     warning.stop();
     launchSound.stop();
     
 
     if(played===false){
 
     blastSound.play();
     played= true;
     }
 
     textSize(40);
     fill("black");
 
    // text("ROCKET CRASHED!", 420, 300);
    crashed();
   }

   if(checkCollision(met2, player, 80)===true && isSpace===true){
    isDestroyed= true;
     player.velocityY= -5;
     
     b1.y= 650;
     explosion.position.x = player.position.x;
     explosion.position.y = player.position.y;
     explosion.visible = true;
     explosion.changeAnimation("blast");
     explosion.scale= 20;
     player.visible = false; 

     warning.stop();
     launchSound.stop();
     
 
     if(played===false){
 
     blastSound.play();
     played= true;
     }
 
     textSize(40);
     fill("black");
 
    // text("ROCKET CRASHED!", 420, 300);
    crashed();
   }

  
    if(isDestroyed===true && isMoon){
      launchSound.setVolume(0);
      warning.setVolume(0);
      launchSound.stop();
      warning.stop();
    }

    if(rover.isTouching(point)){
      
      rover.velocityX= 0;
      rover.velocityY= 0;
      rover.y= 620;
      
      isLanded= true;
      win.play();
      won();
      rover.collide(point);
    }
    else if(rover.isTouching(b1) && !isLanded){
      explosion.position.x = rover.position.x;
       explosion.position.y = rover.position.y;
       explosion.visible = true;
       explosion.changeAnimation("blast");
       explosion.scale= 20;
        rover.destroy();
        
        isFailed= true;
        blastSound.play();

        failed();
       
    }

    if(isLanded===true){
      fill("yellow");
      textSize(30);
      text("SUCCESS!!!", 500,100);

      
    }

    if(isFailed===true){
      fill("yellow");
      textSize(30);
      text("MISSION FAILED!!", 470,100);
    }
    

   drawSprites();

   if (isSpace && meteoriteVisible) {
    fill(255); // Set the fill color
    //rect(meteorite.position.x, meteorite.position.y, 20, 20); // Draw the meteorite
   image(metImg ,meteorite.position.x, meteorite.position.y, 60,60);
    Matter.Body.setStatic(meteorite, false);
    Matter.Body.setVelocity(meteorite, {x:10, y:15});

    fill(255); // Set the fill color
    //rect(meteorite.position.x, meteorite.position.y, 20, 20); // Draw the meteorite
   image(metImg ,met2.position.x, met2.position.y, 60,60);
    Matter.Body.setStatic(met2, false);
    Matter.Body.setVelocity(met2, {x:10, y:15});


  }


 
}

function rotate(sprite){
  sprite.rotation+= 10;
}

function handleData(){
  
}

function checkCollision(body,sprite,dis)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=dis)
            {
             // World.remove(engine.world,fruit);
              // fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function crashed(){
  swal(
    {
      title: `ROCKET CRASHED!`,
      text: "Thanks for playing!!",
      imageUrl:
        "rocket.gif",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );

}

function failed(){
  swal(
    {
      title: `ROVER CRASHED!`,
      text: "Thanks for playing!!",
      imageUrl:
        "rov.gif",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function won(){
  swal(
    {
      title: `YOU WON!`,
      text: "SUCCESSFULL LANDING",
      imageUrl:
        "rov.gif",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function setMoon(){
  if(player.isTouching(b2) &&!isDestroyed && isFlying===true && isSpace===true  ){
    isMoon=true;
    reachedMoon();
  }

}

function reachedMoon(){

  if(isMoon===true){
    bg = image(moonBg, 670, 310, windowWidth, windowHeight);

    player.visible=false;
    isDestroyed= true;
  
    orbiter.display();
     //rope.show();
     rect(rover.position.x, rover.position.y,20,20);
    
  
    if(player===null){
      isDestroyed= true;
    }
  
    point.visible=false;
  
    if(!isLanded){
      point.visible= true;
    rover.visible= true;
    }
  }
 
  if(isMoon===true && instMode!=="MOON" && !isFailed && !isLanded){
    
 
  rover.velocityY= -3;
 // rover.collide(b1);
  

  if(keyIsDown(DOWN_ARROW)){
    rover.velocityY+= 5;
    moveMoon.play();
    moveMoon.setVolume(0.07);
  }

  if(keyIsDown(LEFT_ARROW)){
    rover.velocityX=-7;
    moveMoon.play();
    moveMoon.setVolume(0.07);
  }

  if(keyIsDown(RIGHT_ARROW)){
    rover.velocityX= 7;
    moveMoon.play();
    moveMoon.setVolume(0.07);
  }


}

if(instMode==="MOON" && isMoon===true){
  textSize(20);
  fill("yellow");

  text("Rover is flying due to gravity, press down arrow key to bring it down and land on isro point, which is constantly moving.", 200, 100);
  text("Press left and right arrow key to make it land on point only.", 200, 150);
  text("If rover touches ground, game is over.", 250, 200);
  text("Press 'C' to finish and play more.", 450,300);

  if(keyDown("C") || keyDown("c")){
    instMode= null;
  }
}

}