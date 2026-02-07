interface PaymentGateway
{
processPayment(amount: number): Promise<boolean>;
}
class PaymentProcessor {
  constructor(private gateway: PaymentGateway) {}

  async pay(amount: number): Promise<void> {
    const success = await this.gateway.processPayment(amount);
    if (success) {
      console.log("Payment successful!");
    } else {
      console.log("Payment failed.");
    }
  }
}
//My Code
class BankTransferGateway implements PaymentGateway
{
public async processPayment(amount:number):Promise<boolean>
{
console.log(`Bank Transfer of ${amount}`);
return true;
}
}
class MockGateway implements PaymentGateway
{
public async processPayment(amount:number):Promise<boolean>
{
return new Promise((resolve)=>{
setTimeout(()=>{
console.log(`processing in mock gateway`);
console.log(`Mock Gateway failed while processing amount : ${amount}`);
resolve(false);
},2500);
});
}
}

const p1=new PaymentProcessor(new BankTransferGateway());
p1.pay(250);

const p1=new PaymentProcessor(new MockGateway());
p1.pay(495);