const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const score = document.querySelector(".score");

startScreen.addEventListener("click", startGame);

let player = { speed: 5 ,score : 0};


//Move Lines
function moveLines() {
  let lines = document.querySelectorAll(".line");
  lines.forEach((item, index) => {
    if (item.y > 520) {
      item.y -= 525;
    }
    item.y += player.speed;
    item.style.top = (item.y) + "px";
  });

}

function endGame(){
player.start = false;
score.innerHTML=`Game Over<br>Your Score is: ${player.score} <br>`;
const startAgain = document.createElement("div");
score.appendChild(startAgain);
startAgain.innerHTML="Start Again";
startAgain.addEventListener("click",()=>{
  startGame();
});
}

//Move Enemies
function moveEnemies(car) {
  let enemies = document.querySelectorAll(".enemy");
  enemies.forEach((item, index) => {
    // console.log(index + " " + item.y);
    if(isCollide(car , item)) {
      endGame();
      console.log(player);
    }
    if (item.y >= 525) {
      item.y = ((index+1)*400) * -1;
      item.style.left = Math.floor(Math.random() * 350) + "px";
    }
    item.y += 5;
    item.style.top = (item.y) + "px";

  });
}

//Start Game
function startGame() {
  player.start = true;
  player.score = 0;
  startScreen.classList.add("hide");
  gameArea.classList.remove("hide");
  gameArea.innerHTML=""; //to clear previous elements after game over
  window.requestAnimationFrame(playGame);
  let car = document.createElement("div");

  gameArea.appendChild(car);
  car.setAttribute("class", "car");
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  // console.log(player.x + " " + player.y)
  console.log(gameArea.getBoundingClientRect());

  for (let i = 0; i < 5; i++) {
    let line = document.createElement("div");
    line.classList.add("line");
    line.y = i * 130;
    line.style.top = (i * 130) + "px";
    gameArea.appendChild(line);
  }




  for (let i = 0; i < 3; i++) {
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.y = ((i+1)*400) * -1;
    enemy.style.top = enemy.y + "px";
    enemy.style.left = Math.floor(Math.random() * 350) + "px";
    enemy.style.backgroundColor = randomColor();
    gameArea.appendChild(enemy);
  }


}

function randomColor(){
  function c(){
    const hex = Math.floor(Math.random()*256).toString(16)
    return ("0" + String(hex)).substr(-2);
  }
  return "#"+c()+c()+c();
}




let keys = { ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false }
document.addEventListener("keydown", keyOn);
document.addEventListener("keyup", keyOff);


function keyOn(e) {
  keys[e.key] = true;
}

function keyOff(e) {
  keys[e.key] = false;
}

function isCollide(a,b){
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    (aRect.bottom < bRect.top) ||
    (aRect.top > bRect.bottom) ||
    (aRect.right < bRect.left) ||
    (aRect.left > bRect.right)
  ) 
} 


//Play Game
function playGame() {
  let road = gameArea.getBoundingClientRect();
  let car = document.querySelector(".car");
  
  moveLines();
  moveEnemies(car);
  
  if (player.start) {
    if (keys.ArrowUp && player.y > road.top) { player.y -= player.speed; }
    if (keys.ArrowDown && player.y < road.bottom - 100) { player.y += player.speed; }
    if (keys.ArrowRight && player.x < road.width - 50) { player.x += player.speed; }
    if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed; }
    car.style.left = player.x + 'px';
    car.style.top = player.y + 'px';
    window.requestAnimationFrame(playGame);
    player.score++;
    score.innerText = "Score is :" + player.score;
  }

}
