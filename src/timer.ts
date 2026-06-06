export class Timer {
    time_remaining_ms: number
    last_timestamp: number

    constructor(total_time = 1000){
        this.time_remaining_ms = total_time
        this.last_timestamp = Date.now()
        setInterval(() => this.natural_decay(), 10)
    }

    natural_decay() {
        let current_timestamp = Date.now()
        let time_passed = current_timestamp - this.last_timestamp
        this.time_remaining_ms -= time_passed
        this.last_timestamp = current_timestamp
    }
}