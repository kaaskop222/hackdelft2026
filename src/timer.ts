export class Timer {
    time_remaining_ms: number
    last_timestamp: number
    events: [string, number, number][]
    interval: NodeJS.Timeout
    is_finished: boolean

    constructor(total_time = 1000000){
        this.time_remaining_ms = total_time
        this.last_timestamp = Date.now()
        this.events = []
        this.interval = setInterval(() => this.natural_decay(), 10)
        this.is_finished = false
    }

    natural_decay() {
        let current_timestamp = Date.now()
        let time_passed = current_timestamp - this.last_timestamp
        this.time_remaining_ms -= time_passed
        this.last_timestamp = current_timestamp
        this.check_finished()
    }

    subtract(number_milliseconds: number, short_description: string, 
        timestamp: number
    ) {
        if (this.is_finished) return
        this.time_remaining_ms -= number_milliseconds
        this.events.push([short_description, number_milliseconds, timestamp])
        setTimeout(() => this.events.shift(), 5000)
        this.check_finished()
    }

    check_finished(){
        if (this.time_remaining_ms < 0){
            this.finished()
        }
    }

    finished() {
        clearInterval(this.interval)
        this.time_remaining_ms = 0
        // TODO: Do something when finished
    }
}