export class Timer {
    time_remaining_ms: number
    last_timestamp: number
    events: [string, number][]
    interval: NodeJS.Timeout

    constructor(total_time = 1000){
        this.time_remaining_ms = total_time
        this.last_timestamp = Date.now()
        this.events = []
        this.interval = setInterval(() => this.natural_decay(), 10)
    }

    natural_decay() {
        let current_timestamp = Date.now()
        let time_passed = current_timestamp - this.last_timestamp
        this.time_remaining_ms -= time_passed
        this.last_timestamp = current_timestamp
    }

    subtract(number_milliseconds: number, short_description: string) {
        this.time_remaining_ms -= number_milliseconds
        this.events.push([short_description, number_milliseconds])
        setTimeout(() => this.events.shift(), 5000)
    }

    finished() {
        clearInterval(this.interval)
        this.time_remaining_ms = 0
        // TODO: Do something when finished
    }
}