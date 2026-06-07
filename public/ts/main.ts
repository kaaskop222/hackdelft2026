let name_text = document.querySelector<HTMLDivElement>("#name-text")!

let name = getCookie("username")

let minigame_button = document.querySelector<HTMLButtonElement>("#minigame-button")!

name_text.innerHTML = name

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

async function minigame() {
    document.location.replace('/flappybird.html');
}

minigame_button!.addEventListener("click", () => minigame())
