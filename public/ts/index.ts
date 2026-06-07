console.log("Hi!")

// ----------------
// ELEMENTS
// ----------------
let timer_text = document.querySelector("#timer")!
let subtract_input = document.querySelector<HTMLInputElement>("#subtract-input")!
let subtract_button = document.querySelector<HTMLButtonElement>("#subtract-button")!
let name_input = document.querySelector<HTMLInputElement>("#name-input")!
let event_layer = document.querySelector<HTMLDivElement>("#event-layer")!
let leaderboard = document.querySelector<HTMLDivElement>("#leaderboard-entries")!
let double_button = document.querySelector<HTMLButtonElement>("#double-button")!
let doubling_indicator = document.querySelector<HTMLDivElement>("#doubling-indicator")!

let horn = new Audio('./sounds/horn.mp3')

// ---------------
// VARIABLES
// ----------------

let multiplier: number = 1
let last_fetched_events: number = 0
let synced_timer_remaining: number = 0
let synced_timer_received_at: number = Date.now()
let timer_finished: boolean = false

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
    let event = document.createElement("div")
    let multiplier = "-"
    let type = "positive"
    if (subtraction < 0) { 
        multiplier = "+"
        type = "negative"
        subtraction *= -1
    }
    event.textContent = `${multiplier}${subtraction.toLocaleString()}:${user}:${description}`
    event.classList.add("event-message")
    event.classList.add(type)

    event_layer!.appendChild(event)
    setTimeout(() => event.remove(), 5000)
}

function render_timer_local() {
    if (timer_finished) return
    const elapsed = Date.now() - synced_timer_received_at
    const remaining = Math.max(0, synced_timer_remaining - elapsed*multiplier)
    timer_text!.textContent = msToTime(remaining)
}

function render_leaderboard(entries: [string, number][]) {
    const fragment = document.createDocumentFragment();
    let index = 1
    for (const entry of entries) {
        const row = document.createElement("div");
        row.className = "leaderboard-row";
        row.textContent = `${index}. ${entry[0]}: ${entry[1].toLocaleString()}`;

        if (index == 1){
            row.style.color = "gold"
        }
        else if (index == 2) {
            row.style.color = "silver"
        }
        else if (index == 3) {
            row.style.color = "brown"
        }

        index++
        fragment.appendChild(row);
    }

    leaderboard.replaceChildren(fragment);
}

// --------------------
// SERVER FUNCTIONS
// --------------------

async function sync_timer() {
    let response = await fetch("/timer")
    if(!response.ok){
        throw new Error(`Response status: ${response.status}`)
    }
    let result = await response.json()
    synced_timer_remaining = Number(result)
    synced_timer_received_at = Date.now()
    timer_finished = false
    render_timer_local()

    if (synced_timer_remaining == 0) {
        timer_text!.textContent = "Hello, World!"
        horn.play();
        clearInterval(timer_render_interval)
        clearTimeout(event_timeout)
        clearTimeout(leaderboard_timeout)
        get_leaderboard()
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

    if(!resp.ok) {
        console.log(`Not ok response ${resp}`)
        return
    }
}


async function get_events() {
    sync_timer()
    let resp = await fetch("/subtract_events?" + new URLSearchParams({
        last_fetch: String(last_fetched_events)
    }))
    if (!resp.ok) throw new Error(`Response status: ${resp.status}`)
    let events = await resp.json()
    let ts = events["ts"]
    let events_list = events["events"]

    last_fetched_events = ts
    for (const event of events_list){
        create_event_display(Number(event[1]), String(event[0]), String(event[3]))
    }
    event_timeout = setTimeout(() => get_events(), 300)
}

async function get_leaderboard() {
    let resp = await fetch("/leaderboard")
    if (!resp.ok) throw new Error(`Response status: ${resp.status}`)
    let lb = await resp.json()
    render_leaderboard(lb)
    leaderboard_timeout = setTimeout(() => get_leaderboard(), 1000)
}

async function double() {
    let resp = await fetch("/double")
    if (!resp.ok) throw new Error(`Response status: ${resp.status}`)
    multiplier *= 2
    console.log(`doubled to ${multiplier}`)

    if (multiplier > 1) {
        doubling_indicator.innerText = `${multiplier}X`
        doubling_indicator.style.fontSize = (90 + 20 * Math.log2(multiplier)) + "px"
    }
}

// -------------------
// MAIN
// -------------------

let timer_render_interval = setInterval(() => render_timer_local(), 37)
let event_timeout = setTimeout(() => get_events(), 1)
let leaderboard_timeout = setTimeout(() => get_leaderboard(), 1)

subtract_button!.addEventListener("click", () => subtract())

double_button.onclick = () => double()
