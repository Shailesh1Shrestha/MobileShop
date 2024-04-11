const { z } = require("zod");

//* We are using zod to validate the user input which is denote by z. 

//Creating an object schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, {message: "Name must be at least 3 characters long."})
    .max(255, {message: "Name must not be more than 255 characters long."}),
    
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({message: "Invalid email"})
    .min(3, {message: "Email must be at least 3 characters long."})
    .max(255, {message: "Email must not be more than 255 characters long."}),
    
  password: z
    .string({ required_error: "Password is required" })
    .min(6, {message: "Password must be at least 6 characters long."})
    .max(1024, {message: "Name must not be more than 1024 characters long."}),
    
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, {message: "Phone number must be at least 10 characters long."})
    .max(20, {message: "Phone number must not be more than 20 characters long."}),
    
});
 
module.exports = signupSchema;