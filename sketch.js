var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImage, zombie, zombieGroup
var bullet,bulletGroup
var heart1 , heart2 , heart3
var heart1Image,heart2Image , heart3Image
var bullet=70
var gameState="fight"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImage = loadImage("assets/zombie.png")
  heart1Image = loadImage("assets/heart_1.png")
  heart2Image = loadImage("assets/heart_2.png")
  heart3Image = loadImage("assets/heart_3.png")

  
  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
heart1=createSprite(displayWidth-150,40,20,20)
heart1.addImage("heart1",heart1Image)
heart1.visible=false
heart1.scale=0.3

heart2=createSprite(displayWidth-100,40,20,20)
heart2.addImage("heart2",heart2Image)
heart2.visible=false
heart2.scale=0.3

heart3=createSprite(displayWidth-150,40,20,20)
heart3.addImage("heart3",heart3Image)
heart3.scale=0.3

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
  
   zombieGroup=new Group()
   bulletGroup=new Group()
}


function draw() {
  background(0); 



if(gameState==="fight"){


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  bullet=createSprite(player.x,player.y-25,15,3)
  bullet.velocityX=8    
  bulletGroup.add(bullet)
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  
}

if(bulletGroup.isTouching(zombieGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if(bulletGroup.isTouching(zombieGroup[i])){
      bulletGroup.destroyEach()
      zombieGroup[i].destroy()
    }
  }
  
}

if(zombieGroup.isTouching(player)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
    }
  }
  
}
enemy()
}
drawSprites();

if(gameState==="lost"){
  textSize(100)
  text("YOU LOST",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}


}


function enemy(){
  if(frameCount % 100 === 0){
    zombie=createSprite(displayWidth,random(100,500),40,40)
    zombie.addImage(zombieImage)
    zombie.velocityX=-3
    zombie.scale=0.15
    zombie.lifetime=400
    zombie.debug=true
    zombie.setCollider("rectangle",0,0,400,1000)
    zombieGroup.add(zombie)
    
  }
 
  
}