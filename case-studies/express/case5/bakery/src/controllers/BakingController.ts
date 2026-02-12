import { JsonController, Get, Post, Param, Body } from "routing-controllers";
import { orders, Order } from "../data/orders";

@JsonController("/baking")
export class BakingController {
  @Post("/start")
  startBaking(@Body() order: { id: string }) {
    const foundOrder = orders.find(o => o.id === order.id);
    if (!foundOrder) {
      return { status: "error", error: "Order not found" };
    }
    // Simulate starting bake (add status field later)
    return { status: "success", message: `Started baking for order ${order.id}` };
  }

  @Get("/status/:id")
  getStatus(@Param("id") id: string) {
    const order = orders.find(o => o.id === id);
    if (!order) {
      return { status: "error", error: "Order not found" };
    }
    // Simulate status
    return { status: "success", data: { ...order, bakingStatus: "in-progress" } };
  }
}
