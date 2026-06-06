console.log("Hi!");
// ----------------
// ELEMENTS
// ----------------
let timer_text = document.querySelector("#timer");
let subtract_input = document.querySelector("#subtract-input");
let subtract_button = document.querySelector("#subtract-button");
// ---------------
// VARIABLES
// ----------------
let last_fetched_events = 0;
// -----------------
// HELPERS
// ------------------
function msToTime(duration) {
    let multiplier = 1;
    if (duration < 0)
        multiplier = -1;
    duration *= multiplier;
    var milliseconds = Math.floor((duration % 1000) / 100), seconds = Math.floor((duration / 1000) % 60), minutes = Math.floor((duration / (1000 * 60)) % 60), hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let hours_text = (hours < 10) ? "0" + hours : hours;
    let minutes_text = (minutes < 10) ? "0" + minutes : minutes;
    let seconds_text = (seconds < 10) ? "0" + seconds : seconds;
    let multiplier_string = "";
    if (multiplier < 0)
        multiplier_string = "-";
    return multiplier_string + hours_text + ":" + minutes_text + ":" + seconds_text + "." + milliseconds;
}
// --------------------
// SERVER FUNCTIONS
// --------------------
async function get_timer() {
    let response = await fetch("/timer");
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    let result = await response.json();
    timer_text.textContent = msToTime(result);
    if (result == 0) {
        timer_text.textContent = "Hello, World!";
        clearInterval(timer_interval);
        clearInterval(event_interval);
    }
}
async function subtract() {
    let num_subtract = subtract_input.valueAsNumber;
    if (Number.isNaN(num_subtract))
        return;
    let resp = await fetch("/subtract?" + new URLSearchParams({
        subtract_ms: String(num_subtract),
        description: "Subtract Button"
    }).toString());
    if (!resp.ok)
        console.log(`Not ok response ${resp}`);
}
async function get_events() {
    let resp = await fetch("/subtract_events?" + new URLSearchParams({
        last_fetch: String(last_fetched_events)
    }));
    if (!resp.ok)
        throw new Error(`Response status: ${resp.status}`);
    let events = await resp.json();
    console.log(events);
}
// -------------------
// MAIN
// -------------------
get_timer();
let timer_interval = setInterval(() => get_timer(), 20);
let event_interval = setInterval(() => get_events(), 100);
subtract_button.addEventListener("click", () => subtract());
export {};
//# sourceMappingURL=index.js.map