/*
------- Mini Project -------
------- Patient Management System for Hospital -------
*/
//ENUMS
var PatientStatus;
(function (PatientStatus) {
    PatientStatus[PatientStatus["Admitted"] = 0] = "Admitted";
    PatientStatus[PatientStatus["Discharged"] = 1] = "Discharged";
    PatientStatus[PatientStatus["UnderObservation"] = 2] = "UnderObservation";
})(PatientStatus || (PatientStatus = {}));
var Role;
(function (Role) {
    Role[Role["Doctor"] = 0] = "Doctor";
    Role[Role["Nurse"] = 1] = "Nurse";
    Role[Role["Admin"] = 2] = "Admin";
})(Role || (Role = {}));
//CLASSES
var Doctor = /** @class */ (function () {
    function Doctor(name, speciality) {
        this.name = name;
        this.speciality = speciality;
    }
    Doctor.prototype.prescribe = function (medication) {
        console.log("Dr. ".concat(this.name, " prescribes ").concat(medication));
    };
    return Doctor;
}());
var Nurse = /** @class */ (function () {
    function Nurse(name) {
        this.name = name;
    }
    Nurse.prototype.takeVitals = function (p, vitals) {
        p.vitals = vitals;
        console.log("".concat(this.name, " Nurse updated vitals for ").concat(p.name));
    };
    return Nurse;
}());
var patients = [
    { id: 101, name: "Amit", age: 24, status: PatientStatus.Admitted, vitals: [120, 80] },
    { id: 102, name: "Bobby", age: 28, status: PatientStatus.UnderObservation, vitals: [130, 70] }
];
var staffMembers = [
    { id: 1, name: "Manoj Sahu", role: Role.Doctor },
    { id: 2, name: "Tina Roy", role: Role.Nurse },
    { id: 3, name: "Mridul Gehlot", role: Role.Admin }
];
var doctor = new Doctor("Rudarnsh Solanki", "Cardiologist");
doctor.prescribe("Anti Doze");
var newVitals = [110, 90];
var nurse = new Nurse("Georgia");
nurse.takeVitals(patients[1], newVitals);
function printSummary() {
    console.log(); //for a line gap
    console.log("---- SUMMARY ----");
    console.log("____ STAFF MEMBERS _____");
    for (var _i = 0, staffMembers_1 = staffMembers; _i < staffMembers_1.length; _i++) {
        var s = staffMembers_1[_i];
        var rr = "";
        if (s.role == Role.Doctor)
            rr = "Doctor";
        if (s.role == Role.Nurse)
            rr = "Nurse";
        if (s.role == Role.Admin)
            rr = "Admin";
        console.log("ID : ".concat(s.id, ", Name : ").concat(s.name, ", ROLE : ").concat(rr));
    }
    console.log("____ PATIENTS DETAILS _____");
    for (var _a = 0, patients_1 = patients; _a < patients_1.length; _a++) {
        var p = patients_1[_a];
        var rr = "";
        if (p.status == PatientStatus.Admitted)
            rr = "Admitted";
        if (p.status == PatientStatus.UnderObservation)
            rr = "Under Observation";
        if (p.status == PatientStatus.Discharged)
            rr = "Discharged";
        console.log("ID : ".concat(p.id, ", Name : ").concat(p.name, ", Age : ").concat(p.age, ", STATUS : ").concat(rr, ", Vitals : ").concat(p.vitals));
    }
}
printSummary();
