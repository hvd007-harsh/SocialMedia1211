const validate = require('validator');
const isempty = require('is-empty');

module.exports = function (req,res,next) {
    let errors = {};
    req.user.name = (!(isempty(req.user.name))? req.user.name: "");
    req.user.address = (!(isempty(req.user.address))? req.user.address: "");
    req.user.email = (!(isempty(req.user.email))? req.user.email: "");
    req.user.password =(!(isempty(req.user.password))? req.user.password: "");
    req.user.confirmpassword =(!(isempty(req.user.confirmpassword))? req.user.confirmpassword :"");

    //  name checks
   if(isempty(req.user.name)){
        errors.name= "Name field is required ";
   }
    //email check 
    if(isempty(req.user.email)){
        errors.email = "Email field is required";
    }
    else if(!validate.isEmail(req.user.email)){
        errors.email = "Email is invalid";
    }
    
    //address check 
    if(isempty(req.user.address)){
        errors.address = "Address field is required";
    }

    //password check 
    if(isempty(req.user.password)){
        errors.password = "Password need to be filled";
    }
    else if(!validate.isLength(req.user.password,{min:6, max: 10})){
        errors.password = "Password must be at least 6 characters";
    }
    //confirmpassword check 
    if(!isempty(req.user.confirmpassword)){
      if(!validate.equals(req.user.password,req.user.confirmpassword)){
         errors.password2 = "Password must match";
        }
    }
    
    return {errors, isValid: isempty(errors)};
}