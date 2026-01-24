let storage:any[]=[];
function recordAnswer(id:number,answer:any):void
{
storage.push(
{
id:id,
answer:answer
}
);
}

recordAnswer(1,"Mridul");
recordAnswer(2,4598);
recordAnswer(3,["Apple","Ball","Cat"]);

for(const x of storage)
{
console.log(`ID : ${x.id}, Answer : ${x.answer}`);
}
