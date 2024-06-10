const { HardWorker } = require('./modules/hard-worker');

// Create a new instance of the HardWorker class
const worker = new HardWorker();

// Use the setter methods to set the properties
worker.name = 'John Doe';
worker.age = 30;
worker.salary = 5000;

// Use the getter methods to get the properties
console.log(worker.toObject());
