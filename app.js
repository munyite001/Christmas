// ****** GRAB ITEMS **********
const countDown = document.querySelector('.countDown');
const countItems = document.querySelectorAll(".counter h3");
const preLoader = document.querySelector('.preloader');
const audios = document.querySelectorAll('audio');

//  Pre Loader
window.addEventListener('load', ()=> {
  preLoader.classList.add('hide');
  audios.forEach((audio)=> {
    audio.style.zIndex = "100";
  });
});



const deadlineDate = new Date("January 01 , 2023 00:00:00");

// new Date(2023, 0, 1, 00, 00, 00);

const endTime = deadlineDate.getTime();

function getRemainingTime()
{
  currentTime = new Date().getTime();
  let remainingTime = endTime - currentTime

  /*
  1s = 1000ms
  1min = 60s
  1hour = 60min
  1day = 24hrs
  */
 const oneDay = 24 * 60 * 60 * 1000;
 const oneHour = 60 * 60 * 1000;
 const oneMin = 60 * 1000;
 const oneSecond = 1000;

 // Calculate Remaining Time
 let rDays = Math.floor(remainingTime / oneDay);
 let rHours = Math.floor((remainingTime % oneDay) / oneHour);
 let rMins = Math.floor((remainingTime % oneHour) / oneMin);
 let rSecs = Math.floor((remainingTime % oneMin) / oneSecond);

 const rValues = [rDays, rHours, rMins, rSecs];

 // Function to format item
 function format(item)
 {
  if (item < 10)
  {
    return `0${item}`;
  }
  return item;
 }

 countItems.forEach((item, index) => {
  item.innerHTML = format(rValues[index]);
 });

 if (remainingTime < 0)
 {
  clearInterval(count);

  //  HAPPY NEW YEAR TEXT AND ANIMATIONS
  loadFireWorks();
 }
}

let count = setInterval(getRemainingTime, 1000);

getRemainingTime();

/*=============== 
  FIREWORKS
===============*/
function loadFireWorks()
{
  //  Modify The Body
  document.body.innerHTML = 
  `
    <div class="text-container">
      <h1>Happy New Year ! ! !</h1>
    </div>
    <canvas id="Canvas"></canvas>
    <audio autoplay loop controls>
    <source src="fireworks.ogg" type="audio/ogg">
    <source src="./fireworks.mp3" type="audio/mp3">
    Your browser does not support audio.
  </audio>
  `
  document.body.style.backgroundColor = '#000';
  document.body.style.color = '#fff';
  document.body.style.display = 'grid';
  document.body.style.placeItems = 'center';
  

  var c = document.getElementById("Canvas");
  var ctx = c.getContext("2d");
  var cwidth, cheight;
  var shells = [];
  var pass= [];

  var colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];

window.onresize = function() { reset(); }
reset();
function reset() {

  cwidth = window.innerWidth;
	cheight = window.innerHeight;
	c.width = cwidth;
	c.height = cheight;
}

function newShell() {

  var left = (Math.random() > 0.5);
  var shell = {};
  shell.x = (1*left);
  shell.y = 1;
  shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1);
  shell.yoff = 0.01 + Math.random() * 0.007;
  shell.size = Math.random() * 6 + 3;
  shell.color = colors[Math.floor(Math.random() * colors.length)];

  shells.push(shell);
}

function newPass(shell) {

  var pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);

  for (i = 0; i < pasCount; i++) {

    var pas = {};
    pas.x = shell.x * cwidth;
    pas.y = shell.y * cheight;

    var a = Math.random() * 4;
    var s = Math.random() * 10;

		pas.xoff = s *  Math.sin((5 - a) * (Math.PI / 2));
  	pas.yoff = s *  Math.sin(a * (Math.PI / 2));

    pas.color = shell.color;
    pas.size = Math.sqrt(shell.size);

    if (pass.length < 1000) { pass.push(pas); }
  }
}

var lastRun = 0;
Run();
function Run() {

  var dt = 1;
  if (lastRun != 0) { dt = Math.min(50, (performance.now() - lastRun)); }
	lastRun = performance.now();

  //ctx.clearRect(0, 0, cwidth, cheight);
	ctx.fillStyle = "rgba(0,0,0,0.25)";
	ctx.fillRect(0, 0, cwidth, cheight);

  if ((shells.length < 10) && (Math.random() > 0.96)) { newShell(); }

  for (let ix in shells) {

    var shell = shells[ix];

    ctx.beginPath();
    ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
    ctx.fillStyle = shell.color;
    ctx.fill();

    shell.x -= shell.xoff;
    shell.y -= shell.yoff;
    shell.xoff -= (shell.xoff * dt * 0.001);
    shell.yoff -= ((shell.yoff + 0.2) * dt * 0.00005);

    if (shell.yoff < -0.005) {
      newPass(shell);
      shells.splice(ix, 1);
    }
  }

  for (let ix in pass) {

    var pas = pass[ix];

    ctx.beginPath();
    ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
    ctx.fillStyle = pas.color;
    ctx.fill();

    pas.x -= pas.xoff;
    pas.y -= pas.yoff;
    pas.xoff -= (pas.xoff * dt * 0.001);
    pas.yoff -= ((pas.yoff + 5) * dt * 0.0005);
    pas.size -= (dt * 0.002 * Math.random())

    if ((pas.y > cheight)  || (pas.y < -50) || (pas.size <= 0)) {
        pass.splice(ix, 1);
    }
  }
  requestAnimationFrame(Run);
}

}