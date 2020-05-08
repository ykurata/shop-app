const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Title is required";
  }

  // Category checks
  if (Validator.isEmpty(data.category)) {
    errors.category = "Category is required";
  } 

  // Price checks
  if (Validator.isEmpty(data.price)) {
    errors.price = "Price is required";
  }

  // Description checks
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};