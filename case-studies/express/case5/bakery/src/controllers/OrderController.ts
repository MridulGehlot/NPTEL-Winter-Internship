import {JsonController,Get,Post,Param,Body} from "routing-controllers";
import {orders,Order} from "../data/orders";

@JsonController("/Orders")
export class OrderController
{
@Get("/")
getAll(){return orders;}

@Get("/:id")
getOne(@Param("id") id :string)
{
const order=orders.find(o => o.id===id);
if(!order) return {status:"error",error:"Order Not Found"};
return {status:"success",data:order}
}

@Post("/")
create(@Body() order: { customerName: string; flavor: string; quantity: number; pickupDate: string }) {
  const newOrder: Order = {
    ...order,
    id: (orders.length + 1).toString(),
  };
  orders.push(newOrder);
  return { status: "success", data: newOrder };
}
}