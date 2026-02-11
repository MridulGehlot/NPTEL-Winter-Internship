const express=require("express")
const app=express()
const port=3000

app.get("/",(req,res)=>{
res.send("WELCOME")
})

app.get('/events', (req, res) => {
  const events = [
    'Yoga Class - Monday 7pm',
    'Gardening Workshop - Wednesday 5pm',
    'Book Club - Friday 6pm'
  ];
  res.json(events);
});

app.get("/contact",(req,res)=>{
const details={
"email":"amit@gmail.com",
"phone":9827514921
}
res.json(details)
})

app.listen(port,()=>{
console.log(`Server is Listening on port : ${port}`);
})