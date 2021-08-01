var dog,sadDog,happyDog;
var foodObj;
var foodS,foodStock;
var database;
var fedTime,FeedTime, lastfed, feed; 


function preload(){
  bg = loadImage("Images/background.jpg");
  sadDog = loadImage("Images/dog.png");
  happyDog = loadImage("Images/happy dog.png");
}

function setup(){
  database = firebase.database();
  createCanvas(1000,400);

  dog = createSprite(800,200,100,100);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  foodObj = new Food();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastfed = data.val();
  });

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addfood = createButton("Add Food");
  addfood.position(800,95);
  addfood.mousePressed(addFoods);
  
}

function draw(){
  background(46,139,87);
  foodObj.display();

  fill(255,255,254);
  textSize(15);
  
  if(lastfed>=12){
    text("LastFeed : " + lastfed%12+ " pm",350,30)
  }else if(lastfed==0){
    text("LastFeed : 12 am",350,30)
  }else{
    text("LastFeed : " + lastfed + " am",350,30);
  }

  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updatefoodStock(foodS);
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updatefoodStock(foodObj.getfoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getfoodStock(),
  FeedTime:hour()
  })
}