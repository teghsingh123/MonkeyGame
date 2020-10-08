var monkey, monkey_running, Rock, RockIm, Banana, BananaIm, ObstaclesGroup, bananaGroup, backdrop, backdropIm, score, ground;

function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  rockIm = loadImage("stone.png");

  backdropIm = loadImage("jungle.jpg");

  BananaIm = loadImage("banana.png")
}

function setup() {
  createCanvas(400, 400);

  backdrop = createSprite(200, 200, 400, 400);
  backdrop.addImage(backdropIm);
  backdrop.velocityX = -4;
  backdrop.x = backdrop.width / 2;

  score = 0;

  monkey = createSprite(50, 350, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(200, 365, 400, 10);
  ground.visible = false;

  bananaGroup = createGroup();
  ObstaclesGroup = createGroup();


}

function draw() {
  background(220);
  text("score: " + score, 200, 50)

  if (keyDown("space") && monkey.y >= 250) {
    monkey.velocityY = -8;
  }

  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);

  if (backdrop.x < 0) {
    backdrop.x = backdrop.width / 2;
  }

  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 1;
  }

  if (ObstaclesGroup.isTouching(monkey)) {
    monkey.scale = 0.1;
    score = 0;
  }

  switch (score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;
    default:
      break;

  }

  console.log(score);

  if (monkey.isTouching(ObstaclesGroup)) {
    monkey.scale = 0.1;
    score = 0;
  }

  spawnBanana();

  spawnObstacles();

  drawSprites();
}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    Banana = createSprite(400, random(225, 250), 10, 10);
    Banana.addImage(BananaIm);
    Banana.scale = 0.05;
    Banana.velocityX = -4;
    Banana.lifetime = 135
    bananaGroup.add(Banana);
  }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    Rock = createSprite(400, 350, 10, 10);
    Rock.addImage(rockIm);
    Rock.velocityX = -4;
    Rock.scale = 0.15
    Rock.lifetime = 135;
    ObstaclesGroup.add(Rock);
  }
}