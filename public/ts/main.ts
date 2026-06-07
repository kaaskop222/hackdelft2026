let name_text = document.querySelector<HTMLDivElement>("#name-text")!

let name = getCookie("username")

let minigame_button = document.querySelector<HTMLButtonElement>("#minigame-button")!
let hackdelft_button = document.querySelector<HTMLButtonElement>("#hackdelft-button")!

let minigames:string[];

minigames = ['/flappybird.html', '/aim.html', '/type.html']

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

async function minigame() {
    let gameNr = Math.floor(Math.random() * minigames.length);
    document.location.href = minigames[gameNr]!;
}
async function hackdelft() {

    document.location.href = "https://hackdelft.nl";
}

minigame_button!.addEventListener("click", () => minigame())
hackdelft_button!.addEventListener("click", () => hackdelft())
