// reference to canvas
var canvas = document.getElementById("canvas");



var mouse = {
  x: undefined,
  y: undefined
}

canvas.style.left = "0";
canvas.style.top = "0";
canvas.style.position = "absolute";


    var rect = canvas.getBoundingClientRect();


    var trueX = mouse.x - rect.left

    var trueY = mouse.y - rect.top

var canX = window.innerWidth;
var canY = 300;

canvas.width = canX;
canvas.height = canY;


var c = canvas.getContext("2d");

function randomNumber(min,max)
{
    return (Math.random()*(max-min+1)+min);
}

//create mouse object


var colorArray = [
  "#C84127",
  "#67C5C2",
  "#3D2117",
  "#FEFCE8",
  "#000000",
  "",
];

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
  trueX = mouse.x - rect.left;
  trueY = mouse.y - rect.top;
})

window.addEventListener("resize", function() {
  canvas.width = canX;
  canvas.height = canY;
})

var maxRadius = 25;
//var minRadius = radius;
function Circle(x,y,radius,dx,dy) {


  this.x = x;
  this.y = y;
  this.radius = radius;
  this.minRadius = radius;
  this.dx = dx;
  this.dy = dy;
  this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
//template of circle being drawn
  this.draw = function() {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2);
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  }


//template of circle movement
  this.update = function() {
if(this.x+this.radius>canX || this.x - this.radius < 0) {
  this.dx=-this.dx;
}

if(this.y+this.radius>canY || this.y - this.radius < 0) {
  this.dy=-this.dy;
}
this.x+=this.dx;
this.y+=this.dy;

//interactivity

//when mouse close
if (trueX - this.x < 30 && trueX - this.x > -30
  && trueY - this.y < 30 && trueY - this.y > -30
  ) {
    if (this.radius < maxRadius) {
      this.radius += 2;
    }
} else if (this.radius > this.minRadius) {
  this.radius -=0.2;
}

  }
}




var circleArray = [];

for (var i = 0; i < 700; i++) {
var x = Math.random()*canX;
var dx = randomNumber(-1,1);
var y = Math.random()*canY;
var dy = randomNumber(-1,1);
var radius = Math.random()*3+2;
circleArray.push(
  new Circle(x,y,radius,dx,dy))
}



function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0,0,innerWidth,innerHeight);

  for (var i = 0; i <circleArray.length; i++) {
    circleArray[i].draw();
    circleArray[i].update();
  }


}
animate();
