import sampleData from "../data/sample-data.json";
import {useParams} from "react-router-dom";

export default function DoctorPatientDetails() {

    const {patientId,doctorId} = useParams<{
        patientId: string,
        doctorId: string
    }>();
    
    if(!patientId || !doctorId){
        return <div>Invalid parameters</div>
    }

    let data:any = null;
    const numPatientId = Number(patientId);
    const numDoctorId = Number(doctorId);

    sampleData.forEach((patient: any) => {
        if(patient.id === numPatientId && patient.doctorId === numDoctorId){
            data=patient;
        }
    })


  return (
    <div>
      <h1>Doctor Patient Details</h1>
      <p>Patient ID: {patientId}</p>
      <p>Doctor ID: {doctorId}</p>
      {!data && <p>No patient found for the given patient and doctor ID.</p>}
      {data && (
        <div>
          <p>Name: {data.name}</p>
          <p>Doctome Name : {data.doctorName}</p>
        </div>
      )}
    </div>
  )
}