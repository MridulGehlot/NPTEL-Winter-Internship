type EnrollmentProps={
    onEnroll: ()=>void;
};
export default function EnrollmentCard({onEnroll}: EnrollmentProps) {
    return (
    <div>
        <button onClick={onEnroll}>Enroll Now</button>
    </div>
    )
}