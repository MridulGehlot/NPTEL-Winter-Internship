var transactions = [
    { id: 1, type: "checkout" },
    { id: 2, type: "cancelled" },
    { id: 3, type: "return" },
    { id: 4, type: "priority" },
    { id: 5, type: "checkout" }
];
var inventory = {
    "The Hobbit": 3,
    "1984": 5,
    "TypeScript Guide": 2
};
var visitors = ["Alice", "Bob", "Carol"];
//My Code For Challenges
//task1
var transactionCounter = {
    checkout: 0,
    return: 0,
    cancelled: 0,
    priority: 0,
};
for (var i_1 = 0; i_1 < transactions.length; i_1++) {
    var t = transactions[i_1];
    transactionCounter[t.type]++;
}
console.log("Total Count of Transactions is : ");
console.log(transactionCounter);
//task2
var newTransactions = [
    { id: 6, type: "checkout" },
    { id: 7, type: "return" },
    { id: 8, type: "checkout" },
    { id: 9, type: "priority" } // will stop here
];
while (true) {
    if (newTransactions.length === 0) {
        console.log("No transactions in queue, waiting...");
        break;
    }
    var t = newTransactions.shift();
    console.log("Live loop processing: ".concat(t.id, " (").concat(t.type, ")"));
    if (t.type === "priority") {
        console.log("Priority arrived in live loop, stopping processing.");
        break; // exit loop as soon as a priority is seen
    }
}
//task3
var dynamicQueue = [
    { id: 10, type: "return" }
];
var i = 0;
do {
    var t = dynamicQueue[i];
    if (t.type === "return") {
        console.log("Handling dynamic return ".concat(t.id));
    }
    if (t.id === 10) {
        dynamicQueue.push({ id: 11, type: "return" });
        console.log("New return (id=11) added to queue dynamically.");
    }
    i++;
} while (i < dynamicQueue.length);
//task4
for (var x in inventory) {
    inventory[x] = 0;
}
console.log("Inventory after reset \n ".concat(inventory));
for (var item in inventory) {
    console.log("".concat(item, " , ").concat(inventory[item]));
}
//task5
for (var i_2 = visitors.length - 1; i_2 >= 0; i_2--) {
    console.log("Visitor Name : ".concat(visitors[i_2]));
}
