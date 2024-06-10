// Creating a new Set called guestList
let guestList = new Set();
guestList.add("Alice").add("Bob").add("Eve").add("Dave").add("Mallory");

console.log("Guest List:", guestList);
console.log("Guests:");

// Iterating over the guestList and printing each item
for (let item of guestList)
    console.log(item);

console.log("\nDoes guest list have 'Garry'?", guestList.has("Garry"));
console.log("Size of guest list:", guestList.size); 

// Deleting "Bob" from the guestList
guestList.delete("Bob");
console.log("\nUpdated guest list without Bob:", guestList);

// Clearing the guestList
guestList.clear(); 
console.log("\nCleared guest list:", guestList);
console.log("---------------");

// Creating a new Map called menu
let menu = new Map();
menu.set("pasta", 8).set("burger", 6).set("salad", 5).set("steak", 12).set("sushi", 10);

console.log("\nMenu:", menu);
console.log("Items and prices:");

// Iterating over the menu and printing each key-value pair
for (let [key, value] of menu)
    console.log(`${key}'s price is ${value}`);

// Deleting "burger" from the menu
menu.delete("burger");
console.log("Does menu have 'burger'?", menu.has("burger"));
console.log("Size of menu:", menu.size);

// Clearing the menu
menu.clear();
console.log("Cleared menu:", menu);
console.log("---------------");

// Creating a new WeakMap called bankVault
let bankVault = new WeakMap();
let user = {};
let user2 = {};

// Adding entries to the bankVault
bankVault.set(user, "content").set(user2, "content2");

console.log("\nBank Vault:", bankVault);
console.log("Does bank vault have 'user'?", bankVault.has(user));
console.log("Content of 'user' in bank vault:", bankVault.get(user));

// Deleting "user2" from the bankVault
bankVault.delete(user2);
console.log("Updated bank vault:", bankVault);
console.log("---------------");

// Creating a new WeakSet called coinCollection
let coinCollection = new WeakSet();
let obj1 = {
    "coin": "content"
}
let obj2 = {
    "coin1": "content"
}
let obj3 = {
    "coin2": "content"
}

// Adding objects to the coinCollection
coinCollection.add(obj1).add(obj2).add(obj3);

console.log("\nCoin Collection:", coinCollection);
console.log("Does coin collection have 'obj1'?", coinCollection.has(obj2));

// Deleting "obj3" from the coinCollection
coinCollection.delete(obj3);
console.log("Updated coin collection:", coinCollection);
