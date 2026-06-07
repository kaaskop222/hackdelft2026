let name_text = document.querySelector<HTMLDivElement>("#name-text")!

let name = getCookie("username")

let minigame_button = document.querySelector<HTMLButtonElement>("#minigame-button")!
let hackdelft_button = document.querySelector<HTMLButtonElement>("#hackdelft-button")!

let minigames:string[];

minigames = ['/flappybird.html', '/aim.html', '/type.html', '/math.html', '/spaceinvader.html']

name_text.innerHTML = name

export function getCookie(cname: string) {
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
        description: "checked out Hack Delft 2026!",
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

async function minigame() {
    let gameNr = Math.floor(Math.random() * minigames.length);
    document.location.href = minigames[gameNr]!;
}
async function hackdelft() {
    try {
            await subtract(1000)
        } catch (e) {
            console.error('subtract failed', e)
        }
    document.location.href = "https://hackdelft.nl";
}

minigame_button!.addEventListener("click", () => minigame())
hackdelft_button!.addEventListener("click", () => hackdelft())
