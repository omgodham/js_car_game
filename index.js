const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

startScreen.addEventListener("click", starGame);
let player = {speed:5};

function moveLines(){
  for(let i=0 ; i<5 ;i++){
    let line = document.createElement("div");
    line.classList.add("line");
    line.y = i*130;
    // console.log(line.y);
    line.style.top = (i * 130) + "px"; //setting initial postion
    gameArea.appendChild(line);
  }

}

function moveEnemies(){
  for(let i = 0 ; i<3 ; i++){
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.y =((i+1)*300)*-1;
    enemy.style.top = Math.floor(Math.random() * 500) * -1  + "px";
    enemy.style.left = Math.floor(Math.random() * 150) + "px";
    enemy.style.backgroundColor = "red";
    gameArea.appendChild(enemy);
  }
}


function starGame() {
    player.start = true;
    startScreen.classList.add("hide");
    gameArea.classList.remove("hide");
    window.requestAnimationFrame(playGame); //calling playGame once
    let car = document.createElement("div");

    gameArea.appendChild(car);
    car.setAttribute("class", "car");
    player.x = car.offsetLeft; //This will give the current position of element from left 
    player.y = car.offsetTop; //This will give the current position of element from top 
    //offsetRight and offsetBottom not possible 
    console.log(player.x +" " + player.y)
    console.log(gameArea.getBoundingClientRect());

moveLines();
// moveEnemies();
  
  

  }

let keys = {ArrowUp:false , ArrowDown:false ,ArrowRight:false , ArrowLeft:false}
document.addEventListener("keydown", keyOn);
document.addEventListener("keyup", keyOff);

  
function keyOn(e) {
 keys[e.key] = true;
}

function keyOff(e) {
    keys[e.key] = false;
}

//literally this function will keep executing all the time till your application is running
//so whatever the changes in the keys object it will execute that changes else position will not be changed
function playGame() {
    let road = gameArea.getBoundingClientRect(); //this will give you the postion and x and y cordinates of that element
//for postions see fig on the https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

      let car = document.querySelector(".car");

let lines = document.querySelectorAll(".line");
lines.forEach((item,index)=>{ //it is very simple as we are adding the 5 in the its top position at one time 
  //it will exceed the top position of last element i.e 520 here ( 4 * 130) and then you have to reset its position to position of 
  //first element top position(i.e 0 here) and we have to do this for each element
  if(item.y > 520){
    item.y -= 525; 
  }
  item.y += player.speed; //item.y = item.y + player.speed
  item.style.top = (item.y) + "px" ;  // here we are changing postion with 5 i.e speed
});


// let enemies = document.querySelectorAll(".enemy");
// enemies.forEach((item,index)=>{ //it is very simple as we are adding the 5 in the its top position at one time 
//   //it will exceed the top position of last element i.e 520 here ( 4 * 130) and then you have to reset its position to position of 
//   //first element top position(i.e 0 here) and we have to do this for each element
//  console.log(index+" "+item.y);
//   if(item.y > 520){
//     item.y -= 525; 
//     item.style.left = Math.floor(Math.random() * 200) + "px";
//   }
//   item.y += player.speed; //item.y = item.y + player.speed
//   item.style.top = (item.y) + "px" ;  // here we are changing postion with 5 i.e speed
// });


       if(player.start){ 
    if(keys.ArrowUp && player.y > road.top){ player.y -= player.speed;}
    if(keys.ArrowDown && player.y < road.bottom-100) {player.y += player.speed;}
    if(keys.ArrowRight && player.x < road.width-50) {player.x += player.speed;}
    if(keys.ArrowLeft && player.x > 0){ player.x -= player.speed;}
    car.style.left = player.x + 'px';
    car.style.top = player.y + 'px';
     window.requestAnimationFrame(playGame); //here it will be get call again and agin
  }
 
}
