//Data Model From give Code
interface Observer { update(msg: string): void; }
class Customer implements Observer { update(msg: string) { console.log("Customer:", msg); } }
class Inventory implements Observer { update(msg: string) { console.log("Inventory:", msg); } }
class DrinkOrder {
  private observers: Observer[] = [];
  addObserver(obs: Observer) { this.observers.push(obs); }
  notifyAll(msg: string) { this.observers.forEach(obs => obs.update(msg)); }
  completeOrder() { this.notifyAll("Order complete!"); }
}

//My Code
class PromotionSystem implements Observer
{
update(msg:string):void
{
if(msg==="Order complete!")
{
console.log("PromotionSystem: Special offer! Buy one latte, get one free today!");
}
}
}

const order = new DrinkOrder();
order.addObserver(new Customer());
order.addObserver(new Inventory());
order.addObserver(new PromotionSystem());
order.completeOrder();