// 1. Simple Declaration & Optional Parameter
function displayMember(id: number, name: string, email?: string): void {
  console.log(`ID: ${id}, Name: ${name}`);
  if (email) console.log(`Email: ${email}`);
}

// 2. Rest Parameters for Fines Tally
function calculateFines(...fines: number[]): number {
  let total = 0;
  for (let fine of fines) total += fine;
  return total;
}

// 3. Default Parameter for Discount
function membershipFee(price: number, discountRate: number = 0.1): number {
  return price - price * discountRate;
}

// 4. Anonymous Function & Callback
function greetVisitor(visitor: string, formatter: (name: string) => void): void {
  formatter(visitor);
}
const vipGreet = (name: string) => console.log(`Welcome VIP ${name}!`);

// 5. Recursion: Factorial (for demonstration)
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// 6. Function Overloads for Report Generation
function generateReport(data: object[]): string;
function generateReport(data: object[], format: "json"): string;
function generateReport(data: any[], format?: string): string {
  if (format === "json") {
    return JSON.stringify(data, null, 2);
  }
  return data.map(item => item.toString()).join("\n");
}

// 7. Function Type & Alias
type VisitorFormatter = (name: string) => void;
let consoleGreet: VisitorFormatter = (n) => console.log(`Hello, ${n}!`);

//My Code
displayMember(101,'Amit');
displayMember(102,'Bobby','bobby@gmail.com');

let fines:number[]=[5, 10, 2.5];
let totalFine:number=calculateFines(...fines);
console.log(`Total Fine : ${totalFine}`);

let money:number=100;
console.log(`Membership fee for (100$) with default discount is : ${membershipFee(money)}$`);
console.log(`Membership fee for (100$) with 20% discount is : ${membershipFee(money,0.20)}$`);

greetVisitor("Alice",vipGreet);
greetVisitor("Alice",consoleGreet);
greetVisitor("Bob",vipGreet);
greetVisitor("Bob",consoleGreet);

console.log(`Factorial of 5 is : ${factorial(5)}`);

let obj=[{title:"1984"},{title:"1986"},{title:"1999"}];
console.log(`Text Report : ${generateReport(obj)}`);
console.log(`JSON Report : ${generateReport(obj,"json")}`);