const Engine = Matter.Engine;
const  World = Matter.World;
 const Events = Matter.Events;
 const Bodies = Matter.Bodies;
 
var particle =null;
var plinkos = [];
var divisions = [];
var divisionHeight=300;
var score = 0;
var particle;
var turn;
var gameState;

var scoreC = "increasing";
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

turn = 5;
   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
gameState = "start";
  }
 function draw() {
  background("black");
 
  Engine.update(engine);
  fill("yellow");
  rectMode(CENTER);
 rect(400,500,800,10);
 
  ground.display();
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   for (var k = 0; k < divisions.length; k++) {
     
    divisions[k].display();
  }
   
   if(particle != null){
    particle.display();
   
  }
  if(turn===0&&particle.body.position.x-ground.body.position.x<=particle.r+ground.width/2 &&
    ground.body.position.x-particle.body.position.x<=particle.r+ground.width/2 &&
    particle.body.position.y-ground.body.position.y<=particle.r+ground.height/2 &&
    ground.body.position.y-particle.body.position.y<=particle.r+ground.height/2){
    gameState = "end";
  }
  if(particle!==null){
   
  if(particle.body.position.x-ground.body.position.x<=particle.r+ground.width/2 &&
    ground.body.position.x-particle.body.position.x<=particle.r+ground.width/2 &&
    particle.body.position.y-ground.body.position.y<=particle.r+ground.height/2 &&
    ground.body.position.y-particle.body.position.y<=particle.r+ground.height/2&&scoreC==="increasing"){
      if(particle.body.position.y>520 && 
        particle.body.position.x<300 ){
        score = score+500;
        scoreC = "increased";
      }
      if(particle.body.position.y>520 &&
         particle.body.position.x>300 ){
        score = score+100;
        scoreC = "increased";
      }
    }
 }



fill("white");
textSize(20)
text("Score : "+score,20,30);
 for(var q=25;q<300;q=q+80){
   fill ("white");
   text("500",q,540);
  }
  for(var c=345;c<800;c=c+80){
    fill ("white");
   text("100",c,540);
  }
  
   if(gameState==="end"){
     fill("gray")
    textSize(100);
    text("Game Over",100,200);
  }
  
}


function mousePressed(){
  if(gameState ==="start"){
  particle = new Particle(mouseX,50,10);
  turn=turn-1;
  scoreC = "increasing";
}
}
