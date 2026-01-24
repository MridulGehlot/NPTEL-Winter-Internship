let fruit:string="Apple";
//This will print fruit name
console.log(fruit);

//variable declaration
let num:number=21;

//function declaration
function doubleMe(x:number):void
{
console.log("The Number is :",x*2);
}

//calling the function
doubleMe(num);

/*
Task 3
Define class Person
With Greet Method
*/
class Person
{
greet(name:string):void
{
console.log("Hello,",name);
}
}
let p:Person=new Person();
p.greet("Mridul");