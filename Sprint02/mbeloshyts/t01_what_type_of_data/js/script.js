// Define variables with different data types
var numberVar = 42;
var bigIntVar = 9007199254740991n;
var stringVar = "Hello, world!";
var booleanVar = true;
var nullVar = null;
var undefinedVar = undefined;
var objectVar = { key: "value" };
var symbolVar = Symbol("foo");
var functionVar = function() {};

// Display variable names and their data types
alert(
    "numberVar is " + typeof numberVar + "\n" +
    "bigIntVar is " + typeof bigIntVar + "\n" +
    "stringVar is " + typeof stringVar + "\n" +
    "booleanVar is " + typeof booleanVar + "\n" +
    "nullVar is " + typeof nullVar + "\n" +
    "undefinedVar is " + typeof undefinedVar + "\n" +
    "objectVar is " + typeof objectVar + "\n" +
    "symbolVar is " + typeof symbolVar + "\n" +
    "functionVar is " + typeof functionVar
);
