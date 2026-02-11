export interface Product
{
id:string,
name:string,
price:number,
inStock:boolean
}

export let products:Product[]=[
{id:"1",name:"Toothpaste",price:150,inStock:true},
{id:"2",name:"Shoes",price:550,inStock:true}
];