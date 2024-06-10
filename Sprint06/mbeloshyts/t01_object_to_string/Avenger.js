class Avenger {
    constructor({ name, alias, gender, age, powers }) {
        this.name = name;
        this.alias = alias;
        this.gender = gender;
        this.age = age;
        this.powers = powers;

        // Define a callable arrow function
        const Avenger = () => {
            return `${this.alias.toUpperCase()}\n${this.powers.join('\n')}`;
        };

        // Add the toString method to the callable function
        Avenger.toString = () => {
            return `name: ${this.name}\ngender: ${this.gender}\nage: ${this.age}`;
        };

        // Return the callable function
        return Avenger;
    }
}

module.exports = { Avenger };
