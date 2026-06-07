class Graph{
    private prices:number[];

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private xpoints:number[]
    private subtractNumberPos:number
    private subtractNumberNeg:number

    constructor() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let context = canvas.getContext("2d");
        if (context == null) throw new Error("context is null"); 
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        this.xpoints = []
        this.prices = []

        this.subtractNumberPos = 10000;
        this.subtractNumberNeg = 5000;



        this.canvas = canvas;
        this.context = context;

        

    }
    // draw graph

    private redraw() {
        let context = this.context;
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if(this.xpoints.length>1){
            for(let i = 0; i<this.xpoints.length; i++){
                context.beginPath();
                context.moveTo(this.xpoints[i]!*50, 250 - (this.prices[i]!-this.prices[0]!))
                context.lineTo(this.xpoints[i+1]!*50, 250 - (this.prices[i+1]!-this.prices[0]!))
                if(this.prices[i+1]! < this.prices[i]!){
                    context.strokeStyle = "red"
                }else{
                    context.strokeStyle = "green"
                }
                context.stroke();
                context.closePath();

                //console.log(this.xpoints[i+1]!*50, this.prices[i+1]!-60250)
            }
        }

    }

    //add new price to prices array
    public setprice(newPrice:number){
        if(this.prices.length >= 10) this.prices.shift()
        this.prices.push(newPrice)
        if(this.xpoints.length < 10) this.xpoints.push(this.xpoints.length)
        
        this.redraw()
        if(this.prices[this.prices.length-1]!>this.prices[this.prices.length-2]!){
            subtract(this.subtractNumberPos);
        }else{
            subtract(-this.subtractNumberNeg);
        }
    }
}

let graph = new Graph()

//Server functions 
async function get_events() {
    let resp = await fetch("/stock")
    if (!resp.ok) throw new Error(`Response status: ${resp.status}`)
    let events = await resp.json()
    graph.setprice(events.regularMarketPrice)
}

//
async function subtract(subtractNum:number) {
    let num_subtract = subtractNum
    if (Number.isNaN(num_subtract)) return
    let name = "stocks"

    let resp = await fetch("/subtract?" + new URLSearchParams({
        subtract_ms: String(num_subtract),
        description: "",
        user: name
    }).toString())

    if(!resp.ok) {
        console.log(`Not ok response ${resp}`)
        return
    }
}


let event_interval = setInterval(() => get_events(), 10000)
