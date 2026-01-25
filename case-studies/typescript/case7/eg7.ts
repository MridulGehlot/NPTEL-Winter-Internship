/*
------- Mini Project -------
------- Patient Management System for Hospital -------
*/

//ENUMS
enum PatientStatus
{
Admitted,
Discharged,
UnderObservation
}
enum Role
{
Doctor,
Nurse,
Admin
}

//INTERFACES
interface Patient
{
id:number;
name:string;
age:number;
status:PatientStatus;
vitals:[number,number]; //tuple
}
interface Staff
{
id:number;
name:string;
role:Role;
}

//CLASSES
class Doctor
{
constructor(public name:string,public speciality:string) {}
prescribe(medication:string)
{
console.log(`Dr. ${this.name} prescribes ${medication}`);
}
}
class Nurse
{
constructor(public name:string){}
takeVitals(p:Patient,vitals:[number,number])
{
p.vitals=vitals;
console.log(`${this.name} Nurse updated vitals for ${p.name}`);
}
}

let patients:Patient[]=[
{id:101,name:"Amit",age:24,status:PatientStatus.Admitted,vitals:[120,80]},
{id:102,name:"Bobby",age:28,status:PatientStatus.UnderObservation,vitals:[130,70]}
];

let staffMembers:Staff[]=[
{id:1,name:"Manoj Sahu",role:Role.Doctor},
{id:2,name:"Tina Roy",role:Role.Nurse},
{id:3,name:"Mridul Gehlot",role:Role.Admin}
];

let doctor:Doctor=new Doctor("Rudarnsh Solanki","Cardiologist");
doctor.prescribe("Anti Doze");

let newVitals:[number,number]=[110,90];
let nurse=new Nurse("Georgia");
nurse.takeVitals(patients[1],newVitals);

function printSummary():void
{
console.log(); //for a line gap
console.log("---- SUMMARY ----");
console.log("____ STAFF MEMBERS _____");
for(let s of staffMembers)
{
let rr:string="";
if(s.role==Role.Doctor) rr="Doctor";
if(s.role==Role.Nurse) rr="Nurse";
if(s.role==Role.Admin) rr="Admin";
console.log(`ID : ${s.id}, Name : ${s.name}, ROLE : ${rr}`);
}
console.log("____ PATIENTS DETAILS _____");
for(let p of patients)
{
let rr:string="";
if(p.status==PatientStatus.Admitted) rr="Admitted";
if(p.status==PatientStatus.UnderObservation) rr="Under Observation";
if(p.status==PatientStatus.Discharged) rr="Discharged";
console.log(`ID : ${p.id}, Name : ${p.name}, Age : ${p.age}, STATUS : ${rr}, Vitals : ${p.vitals}`);
}

}

printSummary();