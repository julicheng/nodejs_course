const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const customerSchema = mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  phone: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Customer = mongoose.model('Customer', customerSchema);

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(customer);
};

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('customer was not found');

  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });

  try {
    customer = await customer.save();
    res.send(customer);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.put('/:id', async (req, res) => {
  // validate
  // if invalid return 400
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error);

  // find and update
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
    { new: true }
  );
  // if not existing, return 404
  if (!customer) return res.status(404).send('customer was not found');

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send('customer was not found');

  res.send(customer);
});

module.exports = router;
