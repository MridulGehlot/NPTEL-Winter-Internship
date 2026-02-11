import express from "express";
import router from "./app.js";  // Your router

const app = express();
const port = 3000;

app.use(express.json());  // Parse JSON bodies
app.use("/products", router);  // Mount your router

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
