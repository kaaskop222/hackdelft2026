export class Timer {
    time_remaining_ms: number
    last_timestamp: number
    //      [DESC,   SUBTRACT, TS,   USER]
    events: [string, number, number, string][]
    interval: NodeJS.Timeout
    is_finished: boolean
    leaderboard: Map<string, number>
    multiplier: number

    constructor(total_time = 1000000){
        this.time_remaining_ms = total_time
        this.last_timestamp = Date.now()
        this.events = []
        this.interval = setInterval(() => this.natural_decay(), 50)
        this.is_finished = false
        this.leaderboard = new Map()
        this.multiplier = 1
    }

    natural_decay() {
        let current_timestamp = Date.now()
        let time_passed = current_timestamp - this.last_timestamp
        this.time_remaining_ms -= time_passed * this.multiplier
        this.last_timestamp = current_timestamp
        this.check_finished()
    }

    subtract(number_milliseconds: number, short_description: string, 
        timestamp: number, user: string
    ) {
        if (this.is_finished || this.time_remaining_ms <= 0) return
        this.time_remaining_ms -= number_milliseconds * this.multiplier
        this.events.push([short_description, number_milliseconds * this.multiplier, timestamp, user])
        setTimeout(() => this.events.shift(), 2000)
        this.check_finished()

        if (user == "") return
        let previous = 0
        if(this.leaderboard.has(user)){
            previous = this.leaderboard.get(user)!
        }
        this.leaderboard.set(user, previous + number_milliseconds*this.multiplier)
    }

    check_finished(){
        if (this.time_remaining_ms < 0){
            this.finished()
        }
    }

    finished() {
        clearInterval(this.interval)
        this.time_remaining_ms = 0
        this.is_finished = true
        // TODO: Do something when finished
    }

    get_events_since_timestamp(timestamp: number) {
        let result: [string, number, number, string][] = []
        for (const event of this.events){
            let ts = event[2]
            if (timestamp < ts){
                result.push(event)
            }
        }
        return result
    }

    get_sorted_leaderboard(): [string, number][] {
        return Array.from(this.leaderboard.entries()).sort((a,b) => b[1] - a[1])
    }

    double() {
        this.multiplier *= 2
    }
}