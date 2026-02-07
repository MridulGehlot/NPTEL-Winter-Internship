import sampleData from "../data/sample-data.json";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Medix Portal</h1>
            {Array.isArray(sampleData) && sampleData.map((patient: any) => (
                <div key={patient.id} style={{ marginBottom: 12 }}>
                    <p>Name: {patient.name}</p>
                    <button>
                    <Link to={`/patients/${patient.id}/appointments/${patient.appointmentId}`}>View Appointment</Link>
                    </button>
                    {' '}
                    <button>
                    <Link to={`/patients/${patient.id}/doctors/${patient.doctorId}`}>View Doctor Details</Link>
                    </button>
                </div>
            ))}
        </div>
    );
}