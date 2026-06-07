async function Win(){
        try {
            await subtract(10000)
        } catch (e) {
            console.error('subtract failed', e)
        }
        document.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }

let name = getCookie("username")
Win()

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
        description: "got rickrolled",
        user: name
    }).toString())

    if(!resp.ok) {
        console.log(`Not ok response ${resp}`)
        return
    }
}