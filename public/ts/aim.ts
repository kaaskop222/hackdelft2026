

class aim {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private scoreText: HTMLDivElement;


    private targetX:number;
    private targetY:number;
    private targetAmount: number;

    constructor() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let context = canvas.getContext("2d");
        let scoreText = document.querySelector<HTMLDivElement>("#score-text")!
        if (context == null) throw new Error("context is null"); 
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;

        this.canvas = canvas;
        this.context = context;
        this.scoreText = scoreText;
        this.targetX = 0;
        this.targetY = 0;

        
        this.targetAmount = 0;
        
        this.setNewTarget()
        this.redraw();
        this.createUserEvents();
    }

    private setNewTarget(){
        this.targetX = Math.floor(Math.random() * this.canvas.width)
        this.targetY = Math.floor(Math.random() * this.canvas.height)
    }

    // check user input mousedown or touch
    private createUserEvents() {
        let canvas = this.canvas;

        canvas.addEventListener("mousedown", this.pressEventHandler);
        
        canvas.addEventListener("touchstart", this.pressEventHandler);
        canvas.style.touchAction = "none";
        
        let clearElement = document.getElementById('clear')
        if(clearElement == null) throw new Error("clearElement is null")
        clearElement.addEventListener("click", this.clearEventHandler);
        
    }
    //draw player
    private redraw() {
        let context = this.context;

        
        context.beginPath();
        context.arc(this.targetX, this.targetY, 20, 0, 2 * Math.PI);
        context.fillStyle = "red";
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
    e.preventDefault()

    const rect = this.canvas.getBoundingClientRect()
    const point = 'changedTouches' in e
        ? e.changedTouches[0]!
        : e

    const scaleX = this.canvas.width / rect.width
    const scaleY = this.canvas.height / rect.height
    let mouseX = (point.clientX - rect.left) * scaleX
    let mouseY = (point.clientY - rect.top) * scaleY

    

    let dist = Math.sqrt((mouseX - this.targetX)**2 + (mouseY-this.targetY)**2);
    console.log(dist) 
    if(dist <= 20){
        this.setNewTarget();
        this.targetAmount++;
        this.scoreText.innerHTML = this.targetAmount.toString()
        if(this.targetAmount>9) this.Win()
    }
        this.clearCanvas()
        this.redraw();
    }
    
    //stop when reaching the top
    private async Win(){
        
        try {
            await subtract(10000)
        } catch (e) {
            console.error('subtract failed', e)
        }
        document.location.href = '/main.html';

        
    }


    
}

new aim();

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