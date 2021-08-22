var gameState = "serve";

var ice1, ice2, ice3, water, bg;
var iceImg, waterImg, bg;
var edges;

var restart;

function preload() {
  iceImg = loadAnimation("ice.png");
  waterImg = loadAnimation("water.png");
  bg = loadImage("freezer.jpeg");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 600);

  edges = createEdgeSprites();
}

function draw() {
  background(bg);
  drawSprites();
  if (gameState === "serve") {
    background(bg);
    fill(0);
    textSize(25);
    text("WELCOME I AM FRIZZY", 150, 300);
    text("I HOPE IT'S NOT TOO COLD INSIDE BYEEE!!!", 20, 350);
    text("Press space to start", 200, 450);
  }

  if (keyDown("space") && gameState === "serve") {
    gameState = "play";
    // serve();
    water = createSprite(200, 200);
    water.addAnimation("water drop", waterImg);

    water.scale = 0.05;
    water.setCollider("circle", 0, 90, 300);
    // water.visible = false;
    maze1 = createSprite(500, 100, 200, 20);
    maze1.shapeColor = rgb(255, 255, 0, 0.4);
    // maze1.visible = false;
    maze2 = createSprite(300, 300, 200, 20);
    maze2.shapeColor = rgb(255, 0, 0, 0.4);
    // maze1.visible = false;
    maze3 = createSprite(100, 550, 200, 20);
    maze3.shapeColor = rgb(0, 255, 0, 0.4);
    // maze3.visible = false;
    maze4 = createSprite(200, 400, 200, 20);
    maze4.shapeColor = rgb(0, 0, 255, 0.4);
    // maze4.visible = false;
    maze5 = createSprite(400, 200, 200, 20);
    maze5.shapeColor = rgb(255, 0, 255, 0.4);
    // maze5.visible = false;
    mazeGroup = new Group();
    mazeGroup.add(maze1);
    mazeGroup.add(maze2);
    mazeGroup.add(maze3);
    mazeGroup.add(maze4);
    mazeGroup.add(maze5);

    ice1 = createSprite(100, 60);
    ice1.addAnimation("ice1", iceImg);
    ice1.scale = 0.1;
    ice1.velocityX = 10;
    ice1.setCollider("circle", 0, 0, 200);
    // ice1.visible = false;
    ice2 = createSprite(100, 260);
    ice2.addAnimation("ice2", iceImg);
    ice2.scale = 0.1;
    ice2.velocityX = -10;
    ice2.setCollider("circle", 0, 0, 200);
    // ice2.visible = false;
    ice3 = createSprite(100, 500);
    ice3.addAnimation("ice3", iceImg);
    ice3.scale = 0.1;
    ice3.velocityX = 10;
    ice3.setCollider("circle", 0, 0, 200);
    // ice3.visible = false;
    iceGroup = new Group();
    iceGroup.add(ice1);
    iceGroup.add(ice2);
    iceGroup.add(ice3);
    restart = createSprite(300, 350);
    restart.addImage(restartImg);
    restart.scale = 0.2;
  }
  if (gameState === "play") {
    restart.visible=false;
    iceGroup.bounceOff(edges[0]);
    iceGroup.bounceOff(edges[1]);
    iceGroup.bounceOff(edges[2]);
    iceGroup.bounceOff(edges[3]);
    if (keyDown(RIGHT_ARROW)) {
      // water.x += 10;
      water.velocityX = 5;
    }
    if (keyDown(LEFT_ARROW)) {
      // water.x -= 10;
      water.velocityX = -5;
    }
    if (keyDown(UP_ARROW)) {
      water.velocityY -= 5;
    }
    if (keyDown(DOWN_ARROW)) {
      water.velocityY += 5;
    }
    water.bounceOff(maze1);
    water.bounceOff(maze2);
    water.bounceOff(maze3);
    water.bounceOff(maze4);
    water.bounceOff(maze5);
    water.collide(edges);

    if (water.isTouching(iceGroup)) {
      water.addAnimation("frozen", iceImg);
      water.changeAnimation("frozen", iceImg);
      water.scale = 0.2;
      iceGroup.setVelocityXEach(0);
      water.velocityX = 0;
      water.velocityY = 0;
      textSize(35);
      fill("black");
      text("OOPS, YOU FROZE! ", 130, 150);
      text("Press Restart to play again", 100, 270);
      restart.visible = true;
    }
    if (mousePressedOver(restart)) {
      // location.reload()
      console.log("Pressed");
      water.addAnimation("water drop", waterImg);
      water.changeAnimation("water drop", waterImg);
      water.scale = 0.2;
      water.visible = false;
      ice1.visible = false;
      ice2.visible = false;
      ice3.visible = false;
      restart.visible = false;
      gameState = "serve";
    }
  }
}
