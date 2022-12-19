const canvas= document.querySelector('canvas');
const c= canvas.getContext('2d');
canvas.width=innerWidth;
canvas.height=innerHeight;

//SHOOTER
class Player{
    constructor(x,y,radius,colour){
        this.x= x;
        this.y=y;
        this.radius=radius;
        this.colour=colour;
    }

    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2);
        c.strokeStyle="this.colour";
        c.stroke();
        // Create gradient
        var grd = c.createRadialGradient(this.x+12, this.y-15, 0.5, this.x, this.y, 32);
        grd.addColorStop(0, "white");
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
    constructor(x, y, radius, colour) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.colour = colour;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.strokeStyle="this.colour";
        c.stroke();
        // Create gradient
        var grd = c.createRadialGradient(this.x+12, this.y-15, 0.5, this.x, this.y, 32);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, this.colour);

        // Fill with gradient
        c.fillStyle = grd;
        c.fill();
    }

}

const x=canvas.width /2;
const y= canvas.height -(canvas.height*0.1);
//color
const colorPalatte =['#ff0000','#ff9100','#eaff00','#77ff00','#00f2ff','#0044ff','#bb00ff','#ff00d0'];
var colorpicker =Math.floor(Math.random()*8);
let colour=colorPalatte[colorpicker];

//player
let player=new Player(x,y,30,colour);
player.draw();

//enemy making hehe
const enemys =[];
makingEnemy();

function makingEnemy(){
    var noof_balls = innerWidth / (2 * 30);
    for (var i = 0; i <= noof_balls; i++) {
        var enemy_colorpicker = Math.floor(Math.random() * 8);
        let enemy_colour = colorPalatte[enemy_colorpicker];
        enemys.push( new Enemy(30*(1+2*i),30,30,enemy_colour));
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
                if (dist < 1 + 30 + 10) {
                    console.log('me');
                    checkAdjacent(enemys,index,enemys.length);
                    enemys.splice(index, 1);
                    projectiles.splice(projIndex, 1);
                }
            }else{
                if(dist<1+30+10){
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
        if (arr[i].colour == arr[i + 1].colour && arr[i].x + 60 == arr[i+ 1].x ) {
            count++;
            console.log('noticed');
        } else {
            console.log('ni mila');
            break;
        }
    }
    arr.splice(index+1,count);

}

//click event projectile generator
window.addEventListener('click',(event)=>{
    const angle=Math.atan2(event.clientY-y,event.clientX-x)
    projectiles.push( new Projectile(x,y,10 ,colour,Math.cos(angle),Math.sin(angle)))
    colorpicker =Math.floor(Math.random()*8);
    colour=colorPalatte[colorpicker];
    player=new Player(x,y,30,colour);
})

// let player2=new Player(x+40,y,20,colour);
//draw


projectileAni();