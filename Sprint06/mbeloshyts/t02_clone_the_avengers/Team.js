const { Avenger } = require('./Avenger');

// Define the Team class
class Team {
    // Constructor to initialize the team with an id and avengers
    constructor(id, avengers) {
        this.id = id;
        this.avengers = avengers;
    }

    // Method to simulate a battle and update the avengers' health
    battle({ damage }) {
        // Filter out avengers whose health is reduced to 0 or below
        this.avengers = this.avengers.filter(avenger => {
            avenger.hp -= damage;
            return avenger.hp > 0;
        });
    }

    // Method to calculate and display the losses in the battle
    calculateLosses(clonedTeam) {
        const initialCount = clonedTeam.avengers.length;
        const currentCount = this.avengers.length;
        const losses = initialCount - currentCount;

        if (losses === 0) {
            console.log("We haven't lost anyone in this battle!");
        } else {
            console.log(`In this battle we lost ${losses} Avenger${losses > 1 ? 's' : ''}.`);
        }
    }

    // Method to clone the team and return a new instance
    clone() {
        // Create a new array of cloned avengers
        const clonedAvengers = this.avengers.map(avenger => new Avenger(
            avenger.name, avenger.alias, avenger.gender, avenger.age, avenger.powers, avenger.hp
        ));
        // Return a new Team instance with the same id and cloned avengers
        return new Team(this.id, clonedAvengers);
    }
}

// Export the Team class
module.exports = { Team };
