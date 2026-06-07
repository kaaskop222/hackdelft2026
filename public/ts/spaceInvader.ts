class spaceInvader{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;


    private playerX:number;
    private speed:number;
    private waves:number;
    private obstaclesX: number[][];
    private obstaclesY: number[][];
    private obstacleSpeed:number;


    private interval;

    constructor() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let context = canvas.getContext("2d");
        if (context == null) throw new Error("context is null"); 
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;

        this.canvas = canvas;
        this.context = context;

        this.waves = 5
        this.obstaclesX = []
        for(let i=0; i<this.waves; i++){
            this.obstaclesX[i] = []
            for(let j=0; j<5; j++){
                this.obstaclesX[i]!.push(Math.floor(Math.random()*this.canvas.width))
            }
        }
        this.obstaclesY = []
        for(let i=0; i<this.waves; i++){
            this.obstaclesY[i] = []
            for(let j=0; j<5; j++){
                this.obstaclesY[i]!.push(j*50)
            }
        }
        
        console.log(this.obstaclesX)

        this.playerX = 250;
        this.speed = 0;

        this.obstacleSpeed = 5;
        
        this.update();
        this.redraw();
        this.createUserEvents();
        this.interval = setInterval(() => this.update(), 50);
    }


    // check user input mousedown or touch
    private createUserEvents() {
        let canvas = this.canvas;

        canvas.addEventListener("mousedown", this.pressEventHandler);
        canvas.addEventListener("mouseup", this.releaseEventHandler);
        canvas.addEventListener("mouseout", this.cancelEventHandler);

        canvas.addEventListener("touchstart", this.pressEventHandler);
        canvas.addEventListener("touchend", this.releaseEventHandler);
        canvas.addEventListener("touchcancel", this.cancelEventHandler);
            
        let clearElement = document.getElementById('clear')
        if(clearElement == null) throw new Error("clearElement is null")
        clearElement.addEventListener("click", this.clearEventHandler);
        
    }
    //draw player
    private redraw() {
        let context = this.context;

        for(let i=0; i<this.waves; i++){
            for(let j=0; j<this.obstaclesX.length; j++){
                context.beginPath();
                context.arc(this.obstaclesX[i]![j]!, this.obstaclesY[i]![j]!, 10, 0, 2 * Math.PI);
                context.fillStyle = "red";
                context.fill();
                context.stroke()
                context.closePath();
            }
        }
        
        context.beginPath();
        context.arc(this.playerX, 400, 10, 0, 2 * Math.PI);
        context.fillStyle = "green";
        context.fill();
        context.stroke()
        context.closePath();

    }


   

    private clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
    }

    private clearEventHandler = () => {
        this.clearCanvas();
    }
    private releaseEventHandler = () => {
        this.speed = 0;
        this.redraw();
    }

    private cancelEventHandler = () => {
        this.speed = 0;
        this.redraw();
    }
    //update speed when pressed

    private pressEventHandler = (e: MouseEvent | TouchEvent) => {
    let mouseX = (e as TouchEvent).changedTouches ?
                 (e as TouchEvent).changedTouches[0]!.pageX :
                 (e as MouseEvent).pageX;
    let mouseY = (e as TouchEvent).changedTouches ?
                 (e as TouchEvent).changedTouches[0]!.pageY :
                 (e as MouseEvent).pageY;
    mouseX -= this.canvas.offsetLeft;
    mouseY -= this.canvas.offsetTop;

        if(mouseX > this.canvas.width/2){
        this.speed = 10;
        }else{
            this.speed = -10;
        }

        
        
        this.redraw();
    }
    


    //game logic
    private update(){
        
        for(let i=0; i<this.waves; i++){
            
            for(let j=0; j<this.obstaclesY.length; j++){
                this.obstaclesY[i]![j]! += this.obstacleSpeed;

                let dist = Math.sqrt((this.obstaclesX[i]![j]! - this.playerX)**2 + (this.obstaclesY[i]![j]! - 400)**2);
                if(dist <= 20){
                    this.Lose();
                }

                
            }
        }

        if(this.obstaclesY[0]![0]! > this.canvas.height) {
            this.Win()
        }

        this.playerX += this.speed;
        if(this.playerX > this.canvas.width) this.playerX = this.canvas.width;
        if(this.playerX <0) this.playerX = 0;

        
        this.clearCanvas()
        this.redraw();
    }
    private async Win(){
        clearInterval(this.interval)
        try {
            await subtract(10000)
        } catch (e) {
            console.error('subtract failed', e)
        }
        document.location.href = '/main.html';
    }
    private async Lose(){
        clearInterval(this.interval)
        try {
            await subtract(-10000)
        } catch (e) {
            console.error('subtract failed', e)
        }
        document.location.href = '/main.html';
    }
    
}

new spaceInvader()



let name = getCookie("username")

function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i]!;
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function subtract(subtractNum:number) {
    let num_subtract = subtractNum
    if (Number.isNaN(num_subtract)) return
    

    let resp = await fetch("/subtract?" + new URLSearchParams({
        subtract_ms: String(num_subtract),
        description: "won the aim minigame :)",
        user: name
    }).toString())

    if(!resp.ok) {
        console.log(`Not ok response ${resp}`)
        return
    }
}