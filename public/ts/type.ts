
let request = await fetch('./json/words.json')
let data = await request.json()

let word_input = document.querySelector<HTMLInputElement>("#word-input")!
let target_text = document.querySelector<HTMLParagraphElement>("#target")!

class type{
    private words:string[];
    private targetNr:number;
    private target:string;
    private interval

    constructor(){
        this.words = data;
        this.targetNr = Math.floor(Math.random()*this.words.length)
        this.target = this.words[this.targetNr]!;
        target_text.innerHTML = this.target;
        this.interval = setInterval(() => this.checkWord(), 1);
    }

    public async Win(){
        clearInterval(this.interval)
        try {
            await subtract(10000)
        } catch (e) {
            console.error('subtract failed', e)
        }
        document.location.href = '/main.html';
    }

    private checkWord() {
        let word = word_input.value
        if(word == this.target){
            this.Win()
        }
    }
}

new type()

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