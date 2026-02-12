import express from 'express';
import { logDischargeRequest } from './middleware/logDischargeRequest';
import { doctorSignoffCheck } from './middleware/doctorSignoffCheck';
import { pharmacyReview } from './middleware/pharmacyReview';
import { insuranceCheck } from './middleware/insuranceCheck';
import { followupCheck } from './middleware/followupCheck';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logDischargeRequest);

app.post('/discharge',
  doctorSignoffCheck,      
  pharmacyReview ,    
  insuranceCheck,   
  followupCheck,    
  (req, res) => { 
    console.log('DISCHARGE APPROVED!');
    res.json({
      status: "Discharge complete",
      patient: req.body.patientName,
      message: `${req.body.patientName} discharged successfully!`,
      log : req.body.dischargeLog
    });
  }
);

app.use(errorHandler);

// HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({ status: 'CityCare Hospital Discharge System: OK' });
});

app.listen(PORT, () => {
  console.log('\nCityCare Hospital Discharge System');
  console.log(`http://localhost:${PORT}`);
  console.log('\nPOST /discharge requires:');
  console.log('- patientName');
  console.log('- doctorSigned: true');
  console.log('- pharmacyChecked: true'); 
  console.log('- insuranceApproved: true');
  console.log('- followupScheduled: true\n');
});
