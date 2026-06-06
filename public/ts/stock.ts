class Graph{
    private prices:number[];

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private xpoints:number[]

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

        this.canvas = canvas;
        this.context = context;

        

    }

    private redraw() {
        let context = this.context;
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if(this.xpoints.length>1){
            for(let i = 0; i<this.xpoints.length; i++){
                context.beginPath();
                context.moveTo(this.xpoints[i]!*50, 500 - (this.prices[i]!-60250))
                context.lineTo(this.xpoints[i+1]!*50, 500 - (this.prices[i+1]!-60250))
                if(this.prices[i+1]! < this.prices[i]!){
                    context.strokeStyle = "red"
                }else{
                    context.strokeStyle = "green"
                }
                context.stroke();
                context.closePath();

                console.log(this.xpoints[i+1]!*50, this.prices[i+1]!-60250)
            }
        }

    }

    public setprice(newPrice:number){
        if(this.prices.length >= 10) this.prices.shift()
        this.prices.push(newPrice)
        if(this.xpoints.length < 10) this.xpoints.push(this.xpoints.length)
        
        this.redraw()
    }
}

let graph = new Graph()


async function get_events() {
    let resp = await fetch("/stock")
    if (!resp.ok) throw new Error(`Response status: ${resp.status}`)
    let events = await resp.json()
    graph.setprice(events.regularMarketPrice)
}


let event_interval = setInterval(() => get_events(), 10000)
