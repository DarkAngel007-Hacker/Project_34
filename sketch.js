//Create variables here
var dog,dogImg,happyDog,dogImage;
var database;
var foodS,foodStock;

function preload()
{
	dogImg = loadImage("images/dogImg.png");
  dogImage = loadImage("images/dogimg1.png");
}

function setup() {
	createCanvas(800, 700);
  
  database = firebase.database();

  dog = createSprite(400,350,5,5);
  dog.addImage(dogImg);


  foodStock = database.ref("food");
  foodStock.on("value", readStock);
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(dogImage);
  }

  drawSprites();
  //add styles here
  textSize(15);
  fill("white");
  text("Note: Press UP_ARROW Key To Feed Draco Milk!",20,50);

  textSize(15);
  fill("white");
  text("Food remaining:" + foodS,650,50);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(x<=0)
  {
    x=0;
  }else{
    x=x-1;
  }

  database.ref("/").update({
    food:x
  })
}



