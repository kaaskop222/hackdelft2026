console.log("Hi!")

// ----------------
// ELEMENTS
// ----------------
let timer_text = document.querySelector("#timer")
let subtract_input = document.querySelector<HTMLInputElement>("#subtract-input")
let subtract_button = document.querySelector<HTMLButtonElement>("#subtract-button")
let name_input = document.querySelector<HTMLInputElement>("#name-input")

// ---------------
// VARIABLES
// ----------------

let last_fetched_events: number = 0

// -----------------
// HELPERS
// ------------------

function msToTime(duration: number): string {
    let multiplier = 1
    if (duration < 0) multiplier = -1
    duration *= multiplier
    var milliseconds = Math.floor((duration % 1000)),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    let hours_text = (hours < 10) ? "0" + hours : hours;
    let minutes_text = (minutes < 10) ? "0" + minutes : minutes;
    let seconds_text = (seconds < 10) ? "0" + seconds : seconds;

    let multiplier_string = ""
    if (multiplier < 0) multiplier_string = "-"

    if (milliseconds < 100) milliseconds *= 10
    if (milliseconds < 100) milliseconds *= 10

    return multiplier_string + hours_text + ":" + minutes_text + ":" + seconds_text + "." + milliseconds;
}

function create_event_display(subtraction: number, description: string, user: string) {

}

// --------------------
// SERVER FUNCTIONS
// --------------------

async function get_timer() {
    let response = await fetch("/timer")
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }
    let result = await response.json()
    timer_text!.textContent = msToTime(result)
    if (result == 0) {
        timer_text!.textContent = "Hello, World!"
        clearInterval(timer_interval)
        clearTimeout(event_timeout)
    }
}

async function subtract() {
    let num_subtract = subtract_input!.valueAsNumber
    if (Number.isNaN(num_subtract)) return
    let name = name_input!.value

    let resp = await fetch("/subtract?" + new URLSearchParams({
        subtract_ms: String(num_subtract),
        description: "Subtract Button",
        user: name
    }).toString())

    if(!resp.ok) console.log(`Not ok response ${resp}`)
}

async function get_events() {
    let resp = await fetch("/subtract_events?" + new URLSearchParams({
        last_fetch: String(last_fetched_events)
    }))
    if (!resp.ok) throw new Error(`Response status: ${resp.status}`)
    let events = await resp.json()
    console.log(events)
    let ts = events["ts"]
    let events_list = events["events"]
    //console.log(ts)
    //console.log(events_list)
    last_fetched_events = ts
    event_timeout = setTimeout(() => get_events(), 100)
}

// -------------------
// MAIN
// -------------------

get_timer()
let timer_interval = setInterval(() => get_timer(), 50)
let event_timeout = setTimeout(() => get_events(), 1)

subtract_button!.addEventListener("click", () => subtract())