class flappybird {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;


    private birdY:number;
    private gravity:number;
    private speed:number;


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


        this.birdY = 400;
        this.gravity = -1;
        this.speed = 5;
        
        this.update();
        this.redraw();
        this.createUserEvents();
        this.interval = setInterval(() => this.update(), 50);
    }


    // check user input mousedown or touch
    private createUserEvents() {
        let canvas = this.canvas;

        canvas.addEventListener("mousedown", this.pressEventHandler);
        
        canvas.addEventListener("touchstart", this.pressEventHandler);
        
        let clearElement = document.getElementById('clear')
        if(clearElement == null) throw new Error("clearElement is null")
        clearElement.addEventListener("click", this.clearEventHandler);
        
    }
    //draw player
    private redraw() {
        let context = this.context;
        
        context.beginPath();
        context.arc(100, this.birdY, 10, 0, 2 * Math.PI);
        context.fillStyle = "orange";
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

    //update speed when pressed

    private pressEventHandler = (e: MouseEvent | TouchEvent) => {
        

        this.speed = 10;
        
        
        this.redraw();
    }
    
    //stop when reaching the top
    public Win(){
        
        clearInterval(this.interval)
        
    }


    //game logic
    private update(){
        console.log(this.speed);
        if(this.speed > - 50) this.speed += this.gravity;
        this.birdY -= this.speed;

        if(this.birdY < 0) this.Win()
        this.clearCanvas()
        this.redraw();
    }

    
}

new flappybird();
