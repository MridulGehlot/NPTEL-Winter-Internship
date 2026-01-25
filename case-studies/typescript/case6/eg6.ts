function processTransaction(amount:number,desc:string,isCredit:boolean)
{
if(amount<0)
{
throw new Error(`Amount is Negative ${amount}`);
}
if(desc==undefined)
{
desc="";
}
console.log(`Summary of the Transaction`);
console.log(`Amount : ${amount}, Description : ${desc}, isCredit : ${isCredit}`);
}

processTransaction(1000,"Here's Your Tip!!!",true);
let desc:string;
processTransaction(500,desc,false);
processTransaction(-50,desc,false);