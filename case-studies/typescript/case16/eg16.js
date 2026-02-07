var Customer = /** @class */ (function () {
    function Customer() {
    }
    Customer.prototype.update = function (msg) { console.log("Customer:", msg); };
    return Customer;
}());
var Inventory = /** @class */ (function () {
    function Inventory() {
    }
    Inventory.prototype.update = function (msg) { console.log("Inventory:", msg); };
    return Inventory;
}());
var DrinkOrder = /** @class */ (function () {
    function DrinkOrder() {
        this.observers = [];
    }
    DrinkOrder.prototype.addObserver = function (obs) { this.observers.push(obs); };
    DrinkOrder.prototype.notifyAll = function (msg) { this.observers.forEach(function (obs) { return obs.update(msg); }); };
    DrinkOrder.prototype.completeOrder = function () { this.notifyAll("Order complete!"); };
    return DrinkOrder;
}());
//My Code
var PromotionSystem = /** @class */ (function () {
    function PromotionSystem() {
    }
    PromotionSystem.prototype.update = function (msg) {
        if (msg === "Order complete!") {
            console.log("PromotionSystem: Special offer! Buy one latte, get one free today!");
        }
    };
    return PromotionSystem;
}());
var order = new DrinkOrder();
order.addObserver(new Customer());
order.addObserver(new Inventory());
order.addObserver(new PromotionSystem());
order.completeOrder();
