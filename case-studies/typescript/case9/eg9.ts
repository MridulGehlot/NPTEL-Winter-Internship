type CustomerID=string;
type Customer={
id:CustomerID,
name:string,
email?:string
}
let ccc:Customer={
id:"101",
name:"Amit",
email:"amit@gmail.com"
}

type OrderStatus="processing"|"shipped"|"delivered";

type logger = (msg:string) => void;
const log:logger= msg => console.log(`[LOG] : ${msg}`);
type callbackFunction=(status:OrderStatus)=>void;
const processOrder:callbackFunction = status => {
log(`Order is now ${status}`);
}
processOrder("shipped");

type Container<D>={item:D}
let storage1:Container<Customer>={item:ccc}
console.log(storage1);