var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var game_over, game_over_img;
var restart, restart_img;
var rate;


function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  game_over_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);


  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  ground.velocityX = -8;

  invisibleGround = createSprite(200, 190, 600, 10);
  invisibleGround.visible = false;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;

  game_over = createSprite(300, 100, 20, 20);
  game_over.addImage("over", game_over_img);
  game_over.scale = 0.5;
  game_over.visible = false;

  restart = createSprite(500, 150, 20, 20);
  restart.addImage("restart", restart_img);
  restart.visible = false;


  restart = createSprite(300, 150, 20, 20);
  restart.addImage("restart", restart_img);
  restart.scale = 0.7;
  restart.visible = false;

  camera.position.x = displayWidth / 6;
  camera.position.y = displayHeight - 800;

}

function draw() {

  background(180);

  // console.log(camera.position.x / 5);
  if (gamestate === PLAY) {

    restart.visible = false;
    game_over.visible = false;

    trex.x = camera.position.x - 250;
    invisibleGround.x = camera.position.x - 240;

    camera.position.x = camera.position.x + 1;
    // console.log(camera.position.y);

    trex.changeAnimation("running", trex_running);

    score = score + Math.round(getFrameRate() / 60);
    text("Score: " + score, camera.position.x + 200, 50);

    if (keyDown("space") && trex.y > 161) {
      trex.velocityY = -15;
    }

    trex.velocityY = trex.velocityY + 1.5

    if (ground.x < camera.position.x - 10) {
      ground.x = ground.width / 2;
    }

    spawnClouds();
    spawnObstacles();

    if (obstaclesGroup.isTouching(trex)) {
      gamestate = END;
    }
  }

  if (gamestate === END) {

    ground.velocityX = 0;
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    trex.changeAnimation("collided", trex_collided);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    trex.velocityY = 0;

    game_over.x = camera.position.x + 30;
    restart.x = camera.position.x + 30;


    game_over.visible = true;
    restart.visible = true;

    if (mousePressedOver(restart)) {
      reset();
    }

  }
  trex.collide(invisibleGround);
  drawSprites();

}

function spawnClouds() {
  //write code here to spawn the clouds
  if (Math.round(camera.position.x) % 50 === 0) {
    var cloud = createSprite(camera.position.x + 270, 120, 40, 10);
    cloud.y = Math.round(random(80, 120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    //assign lifetime to the variable
    cloud.lifetime = 200;

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }

}

function spawnObstacles() {
  if (Math.round(camera.position.x) % 50 === 0) {
    var obstacle = createSprite(camera.position.x + 270, 165, 10, 40);
    obstacle.velocityX = -8;

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset() {
  trex.changeAnimation("running", trex_running);
  ground.velocityX = -5;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
  gamestate = PLAY;
  game_over.visible = false;


  restart.scale = 0.7;
  restart.visible = false;
  // restart.destroy();

}

// function camera_() {

// }