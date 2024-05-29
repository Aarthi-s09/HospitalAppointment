// schema.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
    enum: ['Yearly check up', 'Monthly', 'Weekly', 'Doctor given date']
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: String,
    required: true
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
