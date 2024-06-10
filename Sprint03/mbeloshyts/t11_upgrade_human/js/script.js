class Human {
    constructor(options) {
        this.firstName = options.firstName;
        this.lastName = options.lastName;
        this.gender = options.gender;
        this.age = options.age;
        this.calories = options.calories;
        this.img = options.img;
        this.hero = false;
    }
    sleepFor() {
        document.querySelector('#info').innerHTML = "I'm sleeping";
    }
    feed() {
        document.querySelector('#info').innerHTML = "Nom nom nom";
    }
}

class Superhero extends Human {
    fly() {
        document.querySelector('#info').innerHTML = `I'm flying`;
        setTimeout(() => {
            document.querySelector('#info').innerHTML = "Iron Man!";
            document.querySelector('img').src = 'assets/images/dancing.gif';
        }, 10000);
    }
    fight() {
        document.querySelector('#info').innerHTML = "Khhhh-chh..." + "Bang-g-g-g... Evil is defeated!";
    }
}

let human = new Human({
    firstName: 'Tony',
    lastName: 'Stark',
    gender: 'Male',
    age: '38',
    calories: '600',
    hero: false
});
let superhero = new Superhero(human);

// Disable fly and fight buttons by default
document.querySelector('#fly').disabled = true;
document.querySelector('#fight').disabled = true;

setTimeout(() => {
    loop()
}, 5000);
setInterval(loop, 60000);

function loop() {
    if (superhero.hero === false) {
        if (human.calories > 0) {
            human.calories -= 200;
            document.getElementById('calories').innerText = human.calories;
        }
        if (human.calories < 500)
            document.querySelector('#info').innerHTML = "I'm still hungry";
    } else {
        if (superhero.calories > 0) {
            superhero.calories -= 200;
            document.getElementById('calories').innerText = superhero.calories;
        }
        if (superhero.calories < 500)
            document.querySelector('#info').innerHTML = "I'm still hungry";
    }
}

document.getElementById('hero').addEventListener('click', hero);
document.getElementById('feed').addEventListener('click', feed);
document.getElementById('sleep').addEventListener('click', sleepFor);
document.getElementById('fly').addEventListener('click', fly);
document.getElementById('fight').addEventListener('click', fightWithEvil);

function hero() {
    if (human.hero === false) {
        if (human.calories > 500) {
            document.querySelector('#firstName').innerText = "Iron";
            document.querySelector('#lastName').innerText = "Man";
            superhero.hero = true;
            human.hero = true;
            superhero.calories = human.calories;
            document.querySelector('#info').innerHTML = "Iron Man!";
            document.querySelector('img').src = 'assets/images/hero.gif';
            document.querySelector('#hero').innerText = 'Back to human';
            enableButtons(['#feed', '#sleep', '#hero', '#fly', '#fight']); // Re-enable all buttons after becoming a superhero
            console.log(`human extended to superhero`);
        } else {
            document.querySelector('#info').innerHTML = "Not enough calories";
            console.log(`FAIL: human extended to superhero`);
        }
    } else if (superhero.hero === true) {
        document.querySelector('#firstName').innerText = "Tony";
        document.querySelector('#lastName').innerText = "Stark";
        superhero.hero = false;
        human.hero = false;
        human.calories = superhero.calories;
        document.querySelector('#info').innerHTML = "I'm human";
        document.querySelector('img').src = 'assets/images/human.gif';
        document.querySelector('#hero').innerText = 'Iron Man!';
        disableButtons(['#fly', '#fight']); // Disable fly and fight buttons after transforming back to human
        console.log(`superhero decreased to human`);
    }
}

let actionInProgress = false; // Flag to track whether an action is in progress

function feed() {
    if (actionInProgress) return; // Prevent multiple feed actions
    actionInProgress = true; // Set flag to indicate action is starting
    if (superhero.hero === false) {
        if (human.calories < 500) {
            human.feed();
            document.querySelector('img').src = 'assets/images/eating.gif';
            setTimeout(() => {
                human.calories += 200;
                document.getElementById('calories').innerText = human.calories;
                document.querySelector('img').src = 'assets/images/human.gif';
                document.querySelector('#info').innerHTML = "I'm human";
                actionInProgress = false; // Reset flag after action is complete
            }, 10000);
            console.log(`feeding successful`);
        } else {
            document.querySelector('#info').innerHTML = "I am not hungry";
            console.log(`feeding failed`);
        }
    } else {
        if (superhero.calories < 500) {
            superhero.feed();
            document.querySelector('img').src = 'assets/images/hero_eating.gif';
            setTimeout(() => {
                superhero.calories += 200;
                document.getElementById('calories').innerText = superhero.calories;
                document.querySelector('img').src = 'assets/images/dancing.gif';
                document.querySelector('#info').innerHTML = "Iron Man!";
                actionInProgress = false; // Reset flag after action is complete
            }, 10000);
            console.log(`feeding successful`);
        } else {
            document.querySelector('#info').innerHTML = "I am not hungry";
            console.log(`feeding failed`);
        }
    }
}

function sleepFor() {
    if (actionInProgress) return; // Prevent multiple sleep actions
    actionInProgress = true; // Set flag to indicate action is starting
    disableButtons(); // Disable all buttons before sleeping
    if (superhero.hero === false) {
        document.querySelector('img').src = 'assets/images/sleeping.gif';
        human.sleepFor();
        setTimeout(() => {
            document.querySelector('#info').innerHTML = "I'm awake now";
            setTimeout(() => {
                document.querySelector('img').src = 'assets/images/human.gif';
                document.querySelector('#info').innerHTML = "I'm human";
                enableButtons(['#feed', '#sleep', '#hero']); // Re-enable specific buttons after waking up
                actionInProgress = false; // Reset flag after action is complete
            }, 2000);
        }, 10000);
        console.log(`sleeping successful`);
    } else {
        document.querySelector('img').src = 'assets/images/sleeping.gif';
        superhero.sleepFor();
        setTimeout(() => {
            document.querySelector('#info').innerHTML = "I'm awake now";
            setTimeout(() => {
                document.querySelector('img').src = 'assets/images/dancing.gif';
                document.querySelector('#info').innerHTML = "Ready to rock!";
                enableButtons(['#feed', '#sleep', '#hero', '#fly', '#fight']); // Re-enable all buttons after waking up
                actionInProgress = false; // Reset flag after action is complete
            }, 2000);
        }, 10000);
        console.log(`sleeping successful`);
    }
}

function fly() {
    if (actionInProgress) return; // Prevent multiple fly actions
    actionInProgress = true; // Set flag to indicate action is starting
    document.querySelector('img').src = 'assets/images/flying.gif';
    superhero.fly();
    setTimeout(() => {
        document.querySelector('img').src = 'assets/images/dancing.gif';
        document.querySelector('#info').innerHTML = "Iron Man!";
        actionInProgress = false; // Reset flag after action is complete
    }, 10000);
    console.log(`flying successful`);
}

function fightWithEvil() {
    if (actionInProgress) return; // Prevent multiple fight actions
    actionInProgress = true; // Set flag to indicate action is starting
    document.querySelector('img').src = 'assets/images/defeating.gif';
    superhero.fight();
    setTimeout(() => {
        document.querySelector('img').src = 'assets/images/dancing.gif';
        document.querySelector('#info').innerHTML = "Iron Man!";
        actionInProgress = false; // Reset flag after action is complete
    }, 10000);
    console.log(`fighting successful`);
}

function disableButtons(buttons) {
    const buttonsToDisable = buttons || ['#feed', '#sleep', '#hero', '#fly', '#fight']; // By default, disable all buttons
    buttonsToDisable.forEach(button => {
        document.querySelector(button).disabled = true;
    });
}

function enableButtons(buttons) {
    buttons.forEach(button => {
        document.querySelector(button).disabled = false;
    });
}
