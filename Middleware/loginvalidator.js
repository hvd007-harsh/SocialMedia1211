const validate = require('validator');
const isempty = require('is-empty');


module.exports = function (req,res,next) {
    let errors = {};

    req.user.email = (!(isempty(req.user.email))? req.user.email: "");
    req.user.password = (!(isempty(req.user.password))? req.user.password: "");
    
    //email check 
    if(isempty(req.user.email)){
        errors.email = "Email field is required";
    }
    else if(!validate.isEmail(req.user.email)){
        errors.email = "Email is invalid";
    }
    //password check 
    if(isempty(req.user.password)){
        errors.password = "Password need to be filled";
    }
    else if(!validate.isLength(req.user.password,{min:6, max: 10})){
        errors.password = "Password must be at least 6 characters";
    }
    return {errors, isValid: isempty(errors)};
}