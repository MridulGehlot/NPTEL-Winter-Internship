import 'reflect-metadata';
import express from 'express';
import { Container } from 'typedi';
import { AppointmentService } from './appointments/AppointmentService';

const app = express();
app.use(express.json());

const appointmentService = Container.get(AppointmentService);

app.post('/appointments', async (req, res) => {
  try {
    const { patient, time, amount } = req.body;
    const result = await appointmentService.bookAppointment(patient, time, amount);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('\nClinic - http://localhost:3000');
  console.log('POST /appointments');
  console.log('{"patient": "alice@clinic.com", "time": "Mon 10AM", "amount": 50}');
});
