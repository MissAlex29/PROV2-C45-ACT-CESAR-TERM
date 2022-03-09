//Estados del Juego
var PLAY=1;
var END=0;
var gameState=1;

var sponge,plate,cat,dog,plateGroup,petsGroup, score,r,randomPlate,position;
var spongeImage , pet1Img, pet2Img ,plate, gameOverImage;
var gameOverSound;

function preload(){
  backgroundImg = loadImage("bg2.png");
  
  spongeImage = loadImage("sponge.png");

  moneyImg = loadImage("Money.png");
  angryImg = loadImage("angryChef.png");

  pet1Img = loadImage("Pet1.png");
  pet2Img = loadImage("Pet2.png");

  plateImg = loadImage("Plate.png");
  glassImg = loadImage("glass.png");
  skilletImg = loadImage("skillet.png");
  silverwareImg = loadImage("silverware.png");

  gameOverImage = loadImage("gameover.png");

}

function setup() {
  createCanvas(800, 600);
  background(255);
  //set - up 
  sponge=createSprite(200,200,20,20);
  sponge.addImage(spongeImage);
  sponge.scale=0.2;
  sponge.setCollider("rectangle",0,0,40,40);
  //set - up 
  money = createSprite(580,40,20,20);
  money.addImage(moneyImg);
  money.scale = 0.1;

  angry = createSprite(350,45,20,20);
  angry.addImage(angryImg);
  angry.scale = 0.08;
  //set - up 
  score=0;
  life  = 4;
  //set - up 
  plateGroup=createGroup();
  petsGroup=createGroup();
  
}

function draw() {
  background(255);
  background(backgroundImg);
  //draw
  sponge.y=World.mouseY;
  sponge.x=World.mouseX;
  //draw
  showPlates();
  pets();
  //draw  
  if(plateGroup.isTouching(sponge)){
    plateGroup.destroyEach();
    score=score+10;
  } else {
    if(petsGroup.isTouching(sponge)){
      petsGroup.destroyEach();
      score = score -10;
      life = life - 1;
      }
  }
  drawSprites();
  textSize(25);
  fill(255);
  text("Money : "+ score,620,50);
  text("Tries: "+ life,400,50);
 
}


function pets(){
  if(World.frameCount%200===0){
    pet =createSprite(300,100,100,100);
    pet.velocityX=-(8+(score/10));
    pet.scale = 0.2;

    r=Math.round(random(1,2));

    if (r == 1) {
      pet.addImage(pet1Img);
      pet.scale = 0.1;
    } else {
      pet.addImage(pet2Img);
      pet.scale = 0.1;
    }

    pet.y=Math.round(random(150,450));
    pet.setLifetime=50;
    petsGroup.add(pet);
  }
}

function showPlates(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    plate=createSprite(400,200,20,20);
   
    //utilizando la variable aleatoria, 
    //cambia la posición para hacerlo más desafiante
    if(position==1){
      plate.x=500;
      plate.velocityX=-(7+(score/4));
      } else {
        if(position==2){
          plate.x=50;
          //Incrementa la velocidad de la fruta, 
          //después de que la puntuación sea 4 o 10
          plate.velocityX= (7+(score/8));
      }
    }
    
    plate.scale=0.2;
    
    r=Math.round(random(1,4));

    if (r == 1) {
      plate.addImage(glassImg);
      //plate.scale = 0.2;
    } else if (r == 2) {
      plate.addImage(skilletImg);
      plate.scale = 0.05;
    } else if (r == 3) {
      plate.addImage(silverwareImg);
      
    } else {
      plate.addImage(plateImg);
      plate.scale = 0.3;
    }
    
    plate.y=Math.round(random(50,450));
    plate.setLifetime=100;
    plateGroup.add(plate);
  }
}