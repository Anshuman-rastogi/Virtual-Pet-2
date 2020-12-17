//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock;
var feedTime, lastFed;
var feed, addFood;
var foodObj;
var box, box1, box2, boxImg, bkgImg, pillow, pillowImg,  dog_running, dgr, dgr2; //edited

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  bkgImg = loadImage("images/Untitled.png"); //edited
  boxImg = loadImage("images/box.png"); //edited
  pillowImg = loadImage("images/pillow1.png"); //edited
  dog_running = loadImage("images/runningLeft.png"); //edited
  dgr = loadImage("images/dogImg2.png"); //edited
  dgr2 = loadImage("images/dogImg3.png"); //edited
}

function setup() {
  
  database = firebase.database();
  createCanvas(1000, 400);

  pillow = createSprite(800, 360); //edited
  pillow.addImage(pillowImg); //edited
  pillow.scale = 0.12; //edited

  box = createSprite(130, 330); //edited
  box.addImage(boxImg); //edited
  box.scale = 0.5; //edited

  box1 = createSprite(205, 330); //edited
  box1.addImage(boxImg); //edited
  box1.scale = 0.5; //edited

  box2 = createSprite(300, 330); //edited
  box2.addImage(boxImg); //edited
  box2.scale = 0.5; //edited

  dog = createSprite(800,300,150,150); //edited
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodObj = new Food();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed Buddy🥛🍖");
  feed.position(355,55); //edited
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food🥛🍗");
  addFood.position(355,80); //edited
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(bkgImg); //edited

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill("black"); //edited
  textSize(18); //edited
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 5,65); //edited
  }
  else if(lastFed==0){
     text("Last Feed : 12 AM",5,65); //edited
  }
  else{
     text("Last Feed : "+ lastFed + " AM", 5,65); //edited
  } 

  textSize(18);
  text("TIP: Use the LEFT & RIGHT ARROW KEYS to move Buddy & then click on Feed Buddy", 170, 15); //edited

  if(keyWentDown(LEFT_ARROW)){ //edited
    dog.addImage(dog_running); //edited
    dog.velocityX = -2; //edited
  } //edited

  if(keyWentUp(LEFT_ARROW)){ //edited
    dog.addImage(dogImg); //edited
    dog.velocityX = 0; //edited
    console.log(dog.x);
  } //edited

  if(keyWentDown(RIGHT_ARROW)){ //edited
    dog.addImage(dgr); //edited
    dog.velocityX = 2; //edited
  } //edited

  if(keyWentUp(RIGHT_ARROW)){ //edited
    dog.addImage(dgr2); //edited
    dog.velocityX = 0; //edited
  } //edited

  drawSprites();

  foodObj.display();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  });  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  });
  dog.addImage(dogImg);
}