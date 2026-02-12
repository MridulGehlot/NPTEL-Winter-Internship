export interface Order
{
id:string;
customerName:string;
flavor:string;
quantity:number;
pickupDate:string;
}

export const orders:Order[]=[
{
id:"1",
customerName:"Maria",
flavor:"vanilla",
quantity:2,
pickupDate:"2024-07-10"
}
];