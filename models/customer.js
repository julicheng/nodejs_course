const mongoose = require('mongoose');
const Joi = require('joi');

// const customerSchema = new mongoose.Schema({
//     isGold: { type: Boolean, default: false },
//     name: { type: String, required: true, minlength: 5, maxlength: 50 },
//     phone: { type: String, required: true, minlength: 5, maxlength: 50 },
//   });

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(customer);
};

const Customer = mongoose.model(
  'Customer',
  new mongoose.Schema({
    isGold: { type: Boolean, default: false },
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    phone: { type: String, required: true, minlength: 5, maxlength: 50 },
  })
);

exports.Customer = Customer;
exports.validate = validateCustomer;
