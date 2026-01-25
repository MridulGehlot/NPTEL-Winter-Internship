// 1. Simple Declaration & Optional Parameter
function displayMember(id, name, email) {
    console.log("ID: ".concat(id, ", Name: ").concat(name));
    if (email)
        console.log("Email: ".concat(email));
}
// 2. Rest Parameters for Fines Tally
function calculateFines() {
    var fines = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fines[_i] = arguments[_i];
    }
    var total = 0;
    for (var _a = 0, fines_1 = fines; _a < fines_1.length; _a++) {
        var fine = fines_1[_a];
        total += fine;
    }
    return total;
}
// 3. Default Parameter for Discount
function membershipFee(price, discountRate) {
    if (discountRate === void 0) { discountRate = 0.1; }
    return price - price * discountRate;
}
// 4. Anonymous Function & Callback
function greetVisitor(visitor, formatter) {
    formatter(visitor);
}
var vipGreet = function (name) { return console.log("Welcome VIP ".concat(name, "!")); };
// 5. Recursion: Factorial (for demonstration)
function factorial(n) {
    if (n <= 1)
        return 1;
    return n * factorial(n - 1);
}
function generateReport(data, format) {
    if (format === "json") {
        return JSON.stringify(data, null, 2);
    }
    return data.map(function (item) { return item.toString(); }).join("\n");
}
var consoleGreet = function (n) { return console.log("Hello, ".concat(n, "!")); };
//My Code
displayMember(101, 'Amit');
displayMember(102, 'Bobby', 'bobby@gmail.com');
var fines = [5, 10, 2.5];
var totalFine = calculateFines.apply(void 0, fines);
console.log("Total Fine : ".concat(totalFine));
var money = 100;
console.log("Membership fee for (100$) with default discount is : ".concat(membershipFee(money), "$"));
console.log("Membership fee for (100$) with 20% discount is : ".concat(membershipFee(money, 0.20), "$"));
greetVisitor("Alice", vipGreet);
greetVisitor("Alice", consoleGreet);
greetVisitor("Bob", vipGreet);
greetVisitor("Bob", consoleGreet);
console.log("Factorial of 5 is : ".concat(factorial(5)));
var obj = [{ title: "1984" }, { title: "1986" }, { title: "1999" }];
console.log("Text Report : ".concat(generateReport(obj)));
console.log("JSON Report : ".concat(generateReport(obj, "json")));
