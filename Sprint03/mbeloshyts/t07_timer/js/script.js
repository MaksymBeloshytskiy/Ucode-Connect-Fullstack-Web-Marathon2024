class Timer {
    constructor(id, delay, counter) {
        this.id = id;
        this.delay = delay;
        this.counter = counter;
        this.timeId = null;
    }
    start() {
        console.log(`Timer ${this.id} started (delay=${this.delay}, stopCount=${this.counter})`);
        this.counter--;
        this.timeId = setInterval(() => this.tick(), this.delay);
    }
    tick() {
        console.log(`Timer ${this.id} Tick! | cycles left ${this.counter}`);
        this.counter--;
        if (this.counter === 0) {
            this.stop();
        }
    }
    stop() {
        console.log(`Timer ${this.id} stopped`);
        clearInterval(this.timeId);
    }
}

function runTimer(id, delay, counter) {
    let timer = new Timer(id, delay, counter);
    timer.start();
}

// Test runTimer function
runTimer("Bleep", 1000, 5);
