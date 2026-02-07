import sampleData from '../data/sample-data.json';
import {useParams} from 'react-router-dom';

export default function Appointment() {

    const {patientId,appointmentId} = useParams<{
        patientId: string,
        appointmentId: string
    }>();

    if(!patientId || !appointmentId){
        return <div>Invalid parameters</div>
    }

    const numPatientId = Number(patientId);
    const numAppointmentId = Number(appointmentId);

    let data: any = null;
    sampleData.forEach((patient: any) => {
        if(patient.id === numPatientId && patient.appointmentId === numAppointmentId){
            data=patient;
        }
    })

  return (
    <div>
      <h1>Appointment</h1>
      {!data && <p>No appointment found for the given patient and appointment ID.</p>}
      {data && (
        <div>
          <p>Patient Name: {data.name}</p>
          <p>Doctor: {data.doctorName}</p>
        </div>
      )}

    </div>
  )
}