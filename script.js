const canvas=document.getElementById("heartCanvas")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth
canvas.height=window.innerHeight

})

class Heart{

constructor(x,y){

this.x=x
this.y=y

this.size=Math.random()*20+10

this.speedY=Math.random()*-1.5-0.5

this.opacity=Math.random()

}

draw(){

ctx.globalAlpha=this.opacity

ctx.fillStyle="#ff4d88"

ctx.beginPath()

ctx.moveTo(this.x,this.y)

ctx.bezierCurveTo(
this.x+this.size/2,
this.y-this.size/2,
this.x+this.size,
this.y+this.size/3,
this.x,
this.y+this.size
)

ctx.bezierCurveTo(
this.x-this.size,
this.y+this.size/3,
this.x-this.size/2,
this.y-this.size/2,
this.x,
this.y
)

ctx.fill()

}

update(){

this.y+=this.speedY

if(this.y<0){

this.y=canvas.height

this.x=Math.random()*canvas.width

}

this.draw()

}

}

let hearts=[]

for(let i=0;i<150;i++){

hearts.push(new Heart(

Math.random()*canvas.width,
Math.random()*canvas.height

))

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

hearts.forEach(h=>h.update())

requestAnimationFrame(animate)

}

animate()

/* CLICK CREATE HEART */

document.addEventListener("click",e=>{

for(let i=0;i<15;i++){

hearts.push(new Heart(e.clientX,e.clientY))

}

})

/* TYPING TEXT */

const text="Cảm ơn em vì sau tất cả em vẫn chọn ở lại bên anh ❤️"

let i=0

function typing(){

if(i<text.length){

document.getElementById("typing").innerHTML+=text.charAt(i)

i++

setTimeout(typing,60)

}

}

typing()
