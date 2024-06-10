class Building {
    constructor(floors, material, address) {
        this.floors = floors; // Number of floors in the building
        this.material = material; // Material used for construction
        this.address = address; // Address of the building
    }

    toString() {
        return [
            `Floors: ${this.floors}`,
            `Material: ${this.material}`,
            `Address: ${this.address}`,
        ].join('\n');
    }
};

class Tower extends Building {
    constructor(floors, material, address) {
        super(floors, material, address);
        this.hasElevator = false; // Whether the tower has an elevator or not
        this.arcCapacity = 0; // Capacity of the arc reactor in the tower
        this.height = 0; // Height of the tower
    }

    getFloorHeight() {
        if (this.floors === 0) {
            return 0;
        } else {
            return this.height / this.floors; // Calculate the height of each floor
        }
    }

    toString() {
        return [
            super.toString(),
            `Elevator: ${this.hasElevator ? '+' : '-'}`,
            `Arc reactor capacity: ${this.arcCapacity}`,
            `Height: ${this.height}`,
            `Floor height: ${this.getFloorHeight()}`
        ].join('\n');
    }
}
