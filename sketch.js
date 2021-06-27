var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
food = createButton("Feed the Dog")
food.position(600,95)
food.mousePressed(feedDog)
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fill("yellow");
  textSize(40);
  text("Feed your pet!!", canvas.width/2 - 120, canvas.height-510);
  //write code to display text lastFed time here

  fill("yellow");
  textSize(40);
  text("Feed your pet!!", canvas.width/2 - 120, canvas.height-510);
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var food_stock_val= foodObj.getfoodStock();
if(food_stock_val<=0){
  foodObj.updateFoodStock(food_stock_val*0)
}
else{
  foodObj.updateFoodStock(food_stock_val*-1)
}

if(lastFed>=12){
Text("Time: PM" )
}else if (lastFed=0){
  Text("Lastfeed : 12AM",350,30);
}
else{
Text("Time: AM")
}
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
