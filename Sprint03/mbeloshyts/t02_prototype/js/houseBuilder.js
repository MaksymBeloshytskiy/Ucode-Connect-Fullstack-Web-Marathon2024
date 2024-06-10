// Define the houseBlueprint prototype
const houseBlueprint = {
    address: '',
    date: new Date(),
    description: '',
    owner: '',
    size: 0,
    getDaysToBuild() {
        return this.size / this._building_speed;
    }
};

// Define the houseBuilder constructor
function HouseBuilder(address, description, owner, size, roomCount) {
    this.address = address;
    this.description = description;
    this.owner = owner;
    this.size = size;
    this.roomCount = roomCount;
    this._building_speed = 0.5;
}

// Set the prototype of houseBuilder to houseBlueprint
HouseBuilder.prototype = houseBlueprint;
