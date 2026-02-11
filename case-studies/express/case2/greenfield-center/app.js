const express=require("express")
const app=express()
const port=3000

const eventsRouter=require("./routes/events")
const classesRouter=require("./routes/classes")
const contactRouter=require("./routes/contact")
app.use("/events",eventsRouter)
app.use("/classes",classesRouter)
app.use("/contact",contactRouter)

app.get("/",(req,res)=>{
res.send("WELCOME")
})


app.listen(port,()=>{
console.log(`Server is Listening on port : ${port}`);
})