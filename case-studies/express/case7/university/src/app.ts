import express from "express";
import {body,validationResult} from "express-validator";
import {Request,Response} from "express";

const app=express();

const applicationValidationRules = [
body("name")
    .isString()
    .notEmpty()
    .withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required"),
  body("birthdate")
    .isISO8601()
    .withMessage("Birthdate must be a valid date (YYYY-MM-DD)"),
  body("grades")
    .isArray({ min: 1 })
    .withMessage("At least one grade is required"),
  body("grades.*")
    .isNumeric()
    .withMessage("All grades must be numbers"),
  body("essay")
    .isLength({ min: 100 })
    .withMessage("Essay must be at least 100 characters"),
  body("recommendationLetter")
    .isURL()
    .withMessage("A valid recommendation letter link is required"),
  body("portfolioLink")
    .isURL()
    .withMessage("A valid portfolio link is required for art applicants.")
];

app.use(express.json());

app.post("/apply", applicationValidationRules, (req:Request, res:Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return all validation errors
    return res.status(400).json({ errors: errors.array() });
  }
  // If we reach here, the application is valid!
  res.json({ status: "Application received!" });
});

app.listen(3000,()=>{
console.log("Server Running ...");
});