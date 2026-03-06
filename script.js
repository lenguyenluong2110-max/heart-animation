
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let sparks = [];
let mouse = {x:0,y:0};

function heart(t){

return {
x:16*Math.pow(Math.sin(t),3),
y:-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))
}

}

class Particle{

constructor(){

let t = Math.random()*Math.PI*2;
let h = heart(t);

this.baseX = canvas.width/2 + h.x*18;
this.baseY = canvas.height/2 + h.y*18;

this.x = this.baseX;
this.y = this.baseY;

this.size = Math.random()*2+1;

this.angle = Math.random()*Math.PI*2;

this.speed = Math.random()*0.02+0.01;

}

update(){

this.angle += this.speed;

this.x = this.baseX + Math.cos(this.angle)*6;
this.y = this.baseY + Math.sin(this.angle)*6;

let dx = mouse.x - this.x;
let dy = mouse.y - this.y;
let dist = Math.sqrt(dx*dx+dy*dy);

if(dist < 120){

this.x -= dx*0.03;
this.y -= dy*0.03;

}

}

draw(){

ctx.beginPath();
ctx.fillStyle="rgba(255,60,120,0.9)";
ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
ctx.fill();

}

}

class Spark{

constructor(x,y){

this.x=x;
this.y=y;

this.vx=(Math.random()-0.5)*6;
this.vy=(Math.random()-0.5)*6;

this.life=100;

}

update(){

this.x+=this.vx;
this.y+=this.vy;

this.life--;

}

draw(){

ctx.fillStyle="rgba(255,200,200,0.8)";
ctx.fillRect(this.x,this.y,2,2);

}

}

function init(){

for(let i=0;i<4000;i++){

particles.push(new Particle())

}

}

function createExplosion(x,y){

for(let i=0;i<120;i++){

sparks.push(new Spark(x,y))

}

}

canvas.addEventListener("click",e=>{

createExplosion(e.clientX,e.clientY)

})

window.addEventListener("mousemove",e=>{

mouse.x=e.clientX
mouse.y=e.clientY

})

function animate(){

ctx.fillStyle="rgba(0,0,0,0.25)";
ctx.fillRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.update();
p.draw();

});

sparks.forEach((s,i)=>{

s.update();
s.draw();

if(s.life<=0){

sparks.splice(i,1)

}

})

requestAnimationFrame(animate)

}

init()
animate()

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth
canvas.height=window.innerHeight

})
