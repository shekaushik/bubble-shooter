const canvas= document.querySelector('canvas');
const c= canvas.getContext('2d');
canvas.width=innerWidth;
canvas.height=innerHeight;

//SHOOTER
class Player{
    constructor(x,y,radius,colour,gradient){
        this.x= x;
        this.y=y;
        this.radius=radius;
        this.colour=colour;
        this.gradient=gradient;
    }

    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2);
        c.strokeStyle="this.colour";
        c.stroke();
        // Create gradient
        var grd = c.createRadialGradient(this.x+r/3, this.y-r/2, r/60, this.x, this.y, r+1.5);
        grd.addColorStop(0, this.gradient);
        grd.addColorStop(1, this.colour);

        // Fill with gradient
        c.fillStyle = grd;
        c.fill();
    }
}

// PROJECTILE
class Projectile {
    constructor(x,y,radius,colour,velocityX,velocityY){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.colour=colour;
        this.velocityX=velocityX;
        this.velocityY=velocityY;
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2);
        c.fillStyle = this.colour;
        c.fill();
    }
    velo_update(){
        this.draw();
        this.x=this.x+5*this.velocityX;
        this.y=this.y+5*this.velocityY;
    }
}

//ENEMY
class Enemy {
    constructor(x, y, radius, colour,gradient) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour;
        this.gradient=gradient;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.strokeStyle='black';
        c.stroke();
        // Create gradient
        var grd = c.createRadialGradient(this.x+r/3, this.y-r/2, r/60, this.x, this.y, r+1.5);
        grd.addColorStop(0, this.gradient);
        grd.addColorStop(1, this.colour);

        // Fill with gradient
        c.fillStyle = grd;
        c.fill();
    }

}

const x=canvas.width /2;
const y= canvas.height -(canvas.height*0.1);
const r=canvas.width/48;
//color
const colorPalatte =['#7600AD','#e2206a','#1B23BD','#249f9f','#ce1fa8','#149519','#e61c1c','#ecb621'];
//const colorPalatte =['#957dad','#d291bc','#50b4d8','#af6e4e','#ff9aa2','#9ee09e','#a4a4a4','#fdd05c'];
const colorGradient =['#e0bbe4','#ffabc4','#9AE5FA','#9DE6E0','#ce9ce6','#CFF0CC','#FFC5C2','#fdfd97'];
var colorpicker =Math.floor(Math.random()*8);
let colour=colorPalatte[colorpicker];
let gradient=colorGradient[colorpicker];

//player
let player=new Player(x,y,r,colour,gradient);
player.draw();

//enemy making hehe
const enemys =[];
makingEnemy();

function makingEnemy(){
    var noof_balls = innerWidth / (2 * r);
    for (var i = 0; i <= noof_balls; i++) {
        var enemy_colorpicker = Math.floor(Math.random() * 8);
        let enemy_colour = colorPalatte[enemy_colorpicker];
        let enemy_gradient=colorGradient[enemy_colorpicker];
        enemys.push( new Enemy(r*(1+2*i),r,r,enemy_colour,enemy_gradient));
    }
}

const projectiles =[];

//Projectile calling function
function projectileAni(){
    requestAnimationFrame(projectileAni); 
    c.clearRect(0,0,innerWidth,innerHeight);  
    player.draw(); 
    for(const enemy of enemys){
        enemy.draw();
    }
    for(const projectile of projectiles){
        projectile.velo_update();
    }
    enemys.forEach((enemy, index) => {
        projectiles.forEach((proj, projIndex) => {
            const dist = Math.hypot(proj.x - enemy.x, proj.y - enemy.y);
            if(proj.colour==enemy.colour){
                if (dist < 1 + r + r/3) {
                    console.log('me');
                    checkAdjacent(enemys,index,enemys.length);
                    enemys.splice(index, 1);
                    projectiles.splice(projIndex, 1);
                }
            }else{
                if(dist<1+r+r/3){
                    projectiles.splice(projIndex, 1);
                }
            }
        })
    })
    
}
//checking adjacent enemy bubble
function checkAdjacent(arr,index,n) {
    let count=0;
    for (i = index; i <n;i++ ) {
        console.log(arr[i].colour);
        console.log(arr[i+1].colour);
        if (arr[i].colour == arr[i + 1].colour && arr[i].x + 2*r == arr[i+ 1].x ) {
            count++;
        } else {
            break;
        }
    }
    arr.splice(index+1,count);

}

//click event projectile generator
window.addEventListener('click',(event)=>{
    const angle=Math.atan2(event.clientY-y,event.clientX-x)
    projectiles.push( new Projectile(x,y,r/3,colour,Math.cos(angle),Math.sin(angle)))
    colorpicker =Math.floor(Math.random()*8);
    colour=colorPalatte[colorpicker];
    gradient=colorGradient[colorpicker];
    player=new Player(x,y,r,colour,gradient);
})

// let player2=new Player(x+40,y,20,colour);
//draw


projectileAni();
