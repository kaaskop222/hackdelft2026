
let number_input = document.querySelector<HTMLInputElement>("#number-input")!
let target_text = document.querySelector<HTMLParagraphElement>("#target")!
let operations = ["/", "+", "-", "*"]

class math{
    private equation!:string;
    private target!:number;

    constructor(){
        let whole = false

        while (!whole) {
            let num1 = Math.floor(Math.random() * 14) + 1
            let num2 = Math.floor(Math.random() * 14) + 1
            let i = Math.floor(Math.random() * operations.length);
            let r = operations[i]!;
            let eq = `${num1} ${r} ${num2}`
            let result = Number(eval(eq))
            console.log(eq)
            console.log(result)
            if (Number.isInteger(result)) whole = true
            this.equation = eq
            this.target = result
        }
        target_text.innerHTML = String(this.equation);
        number_input.onkeyup = () => this.checkNumber()
    }

    public async Win(){
        try {
            await subtract(10000)
        } catch (e) {
            console.error('subtract failed', e)
        }
        document.location.href = '/main.html';
    }

    private checkNumber() {
        let number = number_input.valueAsNumber
        if(number == this.target){
            number_input.onkeyup = null
            this.Win()
        }
    }
}

new math()

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
    
    const url = "/subtract?" + new URLSearchParams({
        subtract_ms: String(num_subtract),
        description: "won the typing minigame :)",
        user: name
    }).toString()

    let resp: Response
    try {
        resp = await fetch(url, { method: 'GET', keepalive: true })
    } catch (e) {
        // Some browsers/environments may reject keepalive; fallback to normal fetch
        resp = await fetch(url)
    }

    if(!resp.ok) {
        console.log(`Not ok response ${resp}`)
        return
    }
}