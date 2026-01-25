var fruit = "Apple";
//This will print fruit name
console.log(fruit);
//variable declaration
var num = 21;
//function declaration
function doubleMe(x) {
    console.log("The Number is :", x * 2);
}
//calling the function
doubleMe(num);
/*
Task 3
Define class Person
With Greet Method
*/
var Person = /** @class */ (function () {
    function Person() {
    }
    Person.prototype.greet = function (name) {
        console.log("Hello,", name);
    };
    return Person;
}());
var p = new Person();
p.greet("Mridul");
