import 'reflect-metadata';  // MUST be first!
import { createExpressServer } from "routing-controllers";
import { OrderController } from "./controllers/OrderController";
import { BakingController } from "./controllers/BakingController";

const app = createExpressServer({
  controllers: [OrderController, BakingController]
  // cors: true 
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Bakery API running on http://localhost:${PORT}`);
  console.log(`Test: http://localhost:${PORT}/orders`);
});
