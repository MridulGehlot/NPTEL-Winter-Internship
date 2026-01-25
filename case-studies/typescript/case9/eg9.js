var ccc = {
    id: "101",
    name: "Amit",
    email: "amit@gmail.com"
};
var log = function (msg) { return console.log("[LOG] : ".concat(msg)); };
var processOrder = function (status) {
    log("Order is now ".concat(status));
};
processOrder("shipped");
var storage1 = { item: ccc };
console.log(storage1);
