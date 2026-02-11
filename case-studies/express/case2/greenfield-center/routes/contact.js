const express=require("express")
const router=express.Router()

router.get("/",(req,res)=>{
res.json({
"email":"amit@gmail.com",
"phone":7828944257
})
})

module.exports=router;