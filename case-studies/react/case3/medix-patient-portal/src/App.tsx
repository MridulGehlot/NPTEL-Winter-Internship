import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Appointment from './components/Appointement'
import DoctorPatientDetails from './components/DoctorPatientDetails'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/patients/:patientId/appointments/:appointmentId' element={<Appointment />} />
          <Route path='/patients/:patientId/doctors/:doctorId' element={<DoctorPatientDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
