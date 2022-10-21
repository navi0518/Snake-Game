let inputdir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

//Game fn
function main(ctime) {
  window.requestAnimationFrame(main);
  //   console.log(ctime);

  //slow down fps speed
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  //   return false;

  // if u bump into yoourself

  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // bump into wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  //updating snake array & food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputdir = { x: 0, y: 0 };
    alert("Game over, Enter any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }

  // if u eaten the food, inc the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();

    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscorebox.innerHTML = "Hi score:" + hiscoreval;
    }
    scorebox.innerHTML = "score:" + score;

    //clone
    snakeArr.unshift({
      x: snakeArr[0].x + inputdir.x,
      y: snakeArr[0].y + inputdir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving snake

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    // const element = array[i];
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputdir.x;
  snakeArr[0].y += inputdir.y;

  //Render/Display the sanke
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main logic
musicSound.play();
// when gameing animation is used(highly recommended)!
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscorebox.innerHTML = "Hi score:" + hiscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputdir = { x: 0, y: 1 }; //game start
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputdir.x = 0;
      inputdir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputdir.x = 0;
      inputdir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputdir.x = -1;
      inputdir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputdir.x = 1;
      inputdir.y = 0;
      break;

    default:
      break;
  }
});
