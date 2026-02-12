import express,{Request,Response,NextFunction} from "express";
import {RedeemRequest,ApiResponse} from "./loyaltyProgram";
import {ApiError, InsufficientPointsError} from "./errors";
import {z} from "zod";
import {RequestHandler} from "express";

const app=express();
const router=express.Router();

app.use(express.json());
app.use(router);

const redeemSchema=z.object({
customerId: z.string().uuid(),
points: z.number().int().positive(),
});

function validate<T extends z.ZodTypeAny>(schema:T):RequestHandler
{
return (req,res,next) =>{
const result=schema.safeParse(req.body);
if(!result.success)
{
return res.status(400).json({
status:"error",
error:result.error.issues[0].message
});
}
req.body=result.data;
next();
};
}

/*
way 1
router.post("/redeem",(req:Request<{},{},RedeemRequest>,res:Response<ApiResponse<{remainingPoints: number}>>)=>{
if(!result.success)
{
return res.status(400).json({
status:"error",
error:result.error.issues[0].message
});
}
res.status(200).json({
status:"success",
data:{remainingPoints:500}
});
});
*/


//way2
//Dummy Data
let data=[
{
"customerId":"550e8400-e29b-41d4-a716-446655440000",
"points":500
},
{
"customerId":"650e8400-e29b-41d4-a716-446655440000",
"points":250
}
];

function findMember(customerId:string)
{
return data.find(d => d.customerId===customerId);
}

router.post("/redeem",validate(redeemSchema),(req,res:Response<ApiResponse<{remainingPoints:number}>>)=>{
//data is already typed and validated
const member = findMember(req.body.customerId);
if(!member) throw new ApiError(404,"No Customer Found");
if (member.points < req.body.points) {
throw new InsufficientPointsError(); // Caught by global middleware
}
member.points-=req.body.points;
res.status(200).json({
status:"success",
data:{remainingPoints:member.points}
});
});

const transferSchema = z.object({
  fromCustomerId: z.string().uuid(),
  toCustomerId: z.string().uuid(),
  points: z.number().int().positive(),
});

router.post("/transfer",validate(transferSchema),(req,res:Response<ApiResponse<{fromAccount:{customerId:string,points:number},toAccount:{customerId:string,points:number}}>>)=>{
//data is already typed and validated
const fromMember = findMember(req.body.fromCustomerId);
const toMember = findMember(req.body.toCustomerId);
if(!fromMember || !toMember) throw new ApiError(404,"No Customer Found");
if (fromMember.points < req.body.points) {
throw new InsufficientPointsError(); // Caught by global middleware
}
fromMember.points-=req.body.points;
toMember.points+=req.body.points;
res.status(200).json({
status:"success",
data:{
fromAccount:fromMember,
toAccount:toMember
}
});
});



//Global Error MiddleWare
app.use((err:Error,req:Request,res:Response,next:NextFunction)=>{
if(err instanceof ApiError)
{
res.status(err.statusCode).json({
status:"error",
error:err.message,
details:err.details
});
}
else
{
console.error(err);
res.status(500).json({ 
status: "error", 
error: "Internal server error" 
});
}
});

router.get("/",(req,res)=>{
res.send("HEllo");
});

app.listen(3000,()=>{
console.log(`Server is listening on port 3000....`);
});