class flappybird {
    constructor() {
        this.clearEventHandler = () => {
            this.clearCanvas();
        };
        // private releaseEventHandler = () => {
        //     this.paint = false;
        //     this.redraw();
        // }
        // private cancelEventHandler = () => {
        //     this.paint = false;
        // }
        this.pressEventHandler = (e) => {
            // let mouseX = (e as TouchEvent).changedTouches ?
            //     (e as TouchEvent).changedTouches[0]!.pageX :
            //     (e as MouseEvent).pageX;
            // let mouseY = (e as TouchEvent).changedTouches ?
            //     (e as TouchEvent).changedTouches[0]!.pageY :
            //     (e as MouseEvent).pageY;
            // mouseX -= this.canvas.offsetLeft;
            // mouseY -= this.canvas.offsetTop;
            this.speed = 10;
            // this.addClick(mouseX, mouseY, false);
            this.redraw();
        };
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext("2d");
        if (context == null)
            throw new Error("context is null");
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        this.canvas = canvas;
        this.context = context;
        this.paint = false;
        this.birdY = 400;
        this.gravity = -1;
        this.speed = 5;
        this.update();
        this.redraw();
        this.createUserEvents();
        this.interval = setInterval(() => this.update(), 50);
    }
    createUserEvents() {
        let canvas = this.canvas;
        canvas.addEventListener("mousedown", this.pressEventHandler);
        // canvas.addEventListener("mousemove", this.dragEventHandler);
        // canvas.addEventListener("mouseup", this.releaseEventHandler);
        // canvas.addEventListener("mouseout", this.cancelEventHandler);
        canvas.addEventListener("touchstart", this.pressEventHandler);
        // // canvas.addEventListener("touchmove", this.dragEventHandler);
        // canvas.addEventListener("touchend", this.releaseEventHandler);
        // canvas.addEventListener("touchcancel", this.cancelEventHandler);
        let clearElement = document.getElementById('clear');
        if (clearElement == null)
            throw new Error("clearElement is null");
        clearElement.addEventListener("click", this.clearEventHandler);
    }
    redraw() {
        // let clickX = this.clickX;
        let context = this.context;
        // let clickDrag = this.clickDrag;
        // let clickY = this.clickY;
        // for (let i = 0; i < clickX.length; ++i) {
        //     context.beginPath();
        //     if (clickDrag[i] && i) {
        //         context.moveTo(clickX[i - 1]!, clickY[i - 1]!);
        //     } else {
        //         context.moveTo(clickX[i]! - 1, clickY[i]!);
        //     }
        //     context.lineTo(clickX[i]!, clickY[i]!);
        //     context.stroke();
        // }
        // context.closePath();
        context.beginPath();
        context.arc(100, this.birdY, 10, 0, 2 * Math.PI);
        context.fillStyle = "orange";
        context.fill();
        context.stroke();
        context.closePath();
    }
    addClick(x, y, dragging) {
        // this.clickX.push(x);
        // this.clickY.push(y);
        // this.clickDrag.push(dragging);
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.clickX = [];
        // this.clickY = [];
        // this.clickDrag = [];
    }
    Win() {
        clearInterval(this.interval);
    }
    update() {
        console.log(this.speed);
        if (this.speed > -50)
            this.speed += this.gravity;
        this.birdY -= this.speed;
        if (this.birdY < 0)
            this.Win();
        this.clearCanvas();
        this.redraw();
    }
}
new flappybird();
export {};
//# sourceMappingURL=flappybird.js.map