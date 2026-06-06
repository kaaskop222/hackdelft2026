console.log("Hi!");
let timer_text = document.querySelector("#timer");
let subtract_input = document.querySelector("#subtract-input");
let subtract_button = document.querySelector("#subtract-button");
console.log(subtract_button);
get_timer();
let interval = setInterval(() => get_timer(), 20);
subtract_button.addEventListener("click", () => subtract());
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
async function get_timer() {
    let response = await fetch("/timer");
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    let result = await response.json();
    timer_text.textContent = msToTime(result);
    if (result == 0) {
        timer_text.textContent = "Hello, World!";
        clearInterval(interval);
    }
}
async function subtract() {
    let num_subtract = Number(subtract_input.innerHTML);
    console.log(num_subtract);
}
export {};
//# sourceMappingURL=index.js.map