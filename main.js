// let canvas = /** @type {HTMLCanvasElement} */ (document.querySelector('#canvas'));

let canvas = document.querySelector('#canvas')
document.querySelector('body').style.margin = 0;
document.querySelector('body').style.overflow = "hidden";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

let mouseMove = {
    mouseX : 0,
    mouseY : 0,
}

window.addEventListener("mousemove",(e) => {
    mouseMove.mouseX = e.x;
    mouseMove.mouseY = e.y;
})

let arrayOfColors = [
    '#EEEBDD',
    '#D8B6A4',
    '#025955',
    '#630000',
    '#000000'
];

let arrayOfCircles = [];

function Circle(positionX,positionY,radious,increamentXBy,increamentYBy,minRadious = 10,maxRadious = 60){
    this.positionX = positionX;
    this.positionY = positionY;
    this.radious = radious;
    this.increamentXBy = increamentXBy;
    this.increamentYBy = increamentYBy;
    this.minRadious = minRadious;
    this.maxRadious = maxRadious;
    this.circleColor = arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)];

    this.Draw = function (){
        c.beginPath();
        c.arc(this.positionX,this.positionY,this.radious,Math.PI * 2,false);
        c.fillStyle = this.circleColor;
        c.fill();
    }

    this.Update = function(){

        if(this.positionX + this.radious > window.innerWidth || this.positionX - this.radious < 0){
            this.increamentXBy =- this.increamentXBy;
        }
        if(this.positionY + this.radious > window.innerHeight || this.positionY - this.radious < 0){
            this.increamentYBy =- this.increamentYBy;
        }

        if(mouseMove.mouseX - this.positionX < 50 && mouseMove.mouseX - this.positionX > -50 && mouseMove.mouseY - this.positionY < 50 && mouseMove.mouseY - this.positionY > -50){
            if(this.radious < maxRadious){
                this.radious += 2;
            }
        }else if(this.radious > this.minRadious){
                this.radious -= 2;
        }
        
        this.positionX += this.increamentXBy;
        this.positionY += this.increamentYBy;

        this.Draw();
    }
}


for (let i = 0; i < 700; i++) {
    let radious = Math.random() * 5 + 2;
    let positionX = Math.random() * (window.innerWidth - radious * 2) + radious;
    let positionY = Math.random() * (window.innerHeight - radious * 2) + radious;
    let increamentXBy = Math.random() * 4;
    let increamentYBy = Math.random() * 4;
    arrayOfCircles.push(new Circle(positionX,positionY,radious,increamentXBy,increamentYBy));
}



function animation() {
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    for (let i = 0; i < arrayOfCircles.length; i++) {
        arrayOfCircles[i].Update();
    }
    requestAnimationFrame(animation);
}

animation();


