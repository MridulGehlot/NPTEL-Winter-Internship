type Transaction = {
  id: number;
  type: "checkout" | "return" | "cancelled" | "priority";
};
const transactions: Transaction[] = [
  { id: 1, type: "checkout" },
  { id: 2, type: "cancelled" },
  { id: 3, type: "return" },
  { id: 4, type: "priority" },
  { id: 5, type: "checkout" }
];
const inventory: { [title: string]: number } = {
  "The Hobbit": 3,
  "1984": 5,
  "TypeScript Guide": 2
};
const visitors: string[] = ["Alice", "Bob", "Carol"];

//My Code For Challenges
//task1
let transactionCounter={
checkout:0,
return:0,
cancelled:0,
priority:0,
};
for(let i=0;i<transactions.length;i++)
{
const t=transactions[i];
transactionCounter[t.type]++;
}
console.log(`Total Count of Transactions is : `);
console.log(transactionCounter);

//task2
let newTransactions:Transaction[] = [
  { id: 6, type: "checkout" },
  { id: 7, type: "return" },
  { id: 8, type: "checkout" },
  { id: 9, type: "priority" } // will stop here
];
while(true)
{
if(newTransactions.length === 0)
{
console.log("No transactions in queue, waiting...");
break;
}
const t=newTransactions.shift()!;
console.log(`Live loop processing: ${t.id} (${t.type})`);
if(t.type==="priority")
{
console.log("Priority arrived in live loop, stopping processing.");
break; // exit loop as soon as a priority is seen
}
}

//task3
let dynamicQueue:Transaction[]=[
{id:10,type:"return"}
];
let i:number=0;
do
{
let t=dynamicQueue[i];
if(t.type==="return")
{
console.log(`Handling dynamic return ${t.id}`);
}
if(t.id === 10)
{
dynamicQueue.push({ id: 11, type: "return" });
console.log("New return (id=11) added to queue dynamically.");
}
i++;
}while(i<dynamicQueue.length);

//task4
for(const x in inventory)
{
inventory[x]=0;
}
console.log(`Inventory after reset \n ${inventory}`);
for(let item in inventory)
{
console.log(`${item} , ${inventory[item]}`);
}

//task5
for(let i=visitors.length-1;i>=0;i--)
{
console.log(`Visitor Name : ${visitors[i]}`);
}