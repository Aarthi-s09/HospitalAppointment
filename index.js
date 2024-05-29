const mongoose = require('mongoose');
const express = require('express');
const Appointment = require('./schema.js'); // Import the Appointment model correctly
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Set Mongoose option to suppress deprecation warning
mongoose.set('strictQuery', true);

// Function to connect to the database
async function connectToDb() {
  try {
    await mongoose.connect('mongodb+srv://Aarthis09:Aarthi1234@cluster0.kexotzh.mongodb.net/HospitalAppointment?retryWrites=true&w=majority&appName=Cluster00', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB Connection established');

    // Start the server
    const port = process.env.PORT || 8002;
    app.listen(port, function () {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Couldn't establish connection");
  }
}

// Connect to the database
connectToDb();

// Endpoint to create a new appointment
app.post('/appointments', async (req, res) => {
  try {
    const { reason, name, email, phone, doctor, appointmentTime, appointmentDate } = req.body;

    const newAppointment = new Appointment({
      reason,
      name,
      email,
      phone,
      doctor,
      appointmentTime,
      appointmentDate
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
