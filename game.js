const gm = document.querySelector("#game");

gm.innerHTML += `<div id="set"><div class="screen">
<div id="display2"><h1 id="disp3">ROUND : 1</h1>
 
<h1 id="disp2">TIME : 30</h1></div> 
<div id="display3"><h1>ROUND WINNER </h1><p id="disp4"></p></div></div>
<div class="screen1">   <div id="display"><h1 id="disp6">COMP - 0</h1><p id="disp" >0</p></div>
<div id="display1"><h1 id="disp5">HUMAN - 0
</h1><p id="disp1">0</p></div></div></div>
<div id="set1"><div id="field"onclick="missCounter(event)">
<div id="box"onclick="pointCounter()"></div></div>
<button class="btn"><a href="#">START</a></button></div>`;

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function moveBox() {
  const box = document.getElementById("box");
  const boardWidth = document.getElementById("field").clientWidth - 50;
  const boardHeight = document.getElementById("field").clientHeight - 50;
  const x = rand(0, boardWidth);
  const y = rand(0, boardHeight);
  const color = getRandomColor();

  box.style.left = x + "px";
  box.style.top = y + "px";
  box.style.backgroundColor = color;
}
const cscore = document.querySelector("#disp6");
const bscore = document.querySelector("#disp5");
const roundWinner = document.querySelector("#disp4");
const field = document.querySelector("#field");
const box = document.querySelector("#box");
const roundQ = document.querySelector("#disp3 ");
const roundTime = document.querySelector("#disp2");
const boss = document.querySelector("#disp1");
const comp = document.querySelector("#disp");
const start = document.querySelector(".btn");

let crnd = 0;
let brnd = 0;
let bpoints = 0;
let cpoints = 0;
let sec = 29;
let round = 1;
let begin;
let click = false;

function missCounter(event) {
  if (event.target === field) cpoints++;
  boss.innerText = bpoints;
  comp.innerText = cpoints;
}
function pointCounter() {
  bpoints++;
  boss.innerText = bpoints;
  comp.innerText = cpoints;
}
function roundTimeout() {
  boss.innerText = "0";
  comp.innerText = "0";
  roundWinner.innerText = "";

  if (bpoints > cpoints) {
    roundWinner.innerText = "HUMAN !!!";
    brnd++;
    bscore.innerText = `HUMAN - ${brnd}`;
  }
  if (bpoints < cpoints) {
    roundWinner.innerText = "COMP !!!";
    crnd++;
    cscore.innerText = `COMP - ${crnd}`;
  }
  if (bpoints === cpoints) {
    roundWinner.innerText = "DRAW";
  }

  bpoints = 0;
  cpoints = 0;
}

start.onclick = function startGame() {
  begin = setInterval(function () {
    roundWinner.innerText = "";
    roundQ.innerText = `ROUND : ${round}`;
    if (sec < 0) {
      sec = 30;
    }
    if (sec < 10) {
      roundTime.innerText = `TIME : 0${sec}`;
    }
    if (sec >= 10) {
      roundTime.innerText = `TIME : ${sec}`;
    }
    if (sec === 0) {
      round++;
      clearInterval(begin);
      setTimeout(roundTimeout, 3000);
    }
    sec--;

    moveBox();
  }, 1000);
};
