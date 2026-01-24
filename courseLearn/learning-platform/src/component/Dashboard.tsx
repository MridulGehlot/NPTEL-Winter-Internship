import CourseCard from './CourseCard';
import Header from './Header';
import {useState} from 'react';

export default function Dashboard() {

  const [progress,setProgress] = useState<number>(0);
  const [student,setStudent]=useState({
    name: "Amit",
    course : "Full Stack Development",
    progress : "45%",
  });
  const [courses,setCourses]=useState([
    {
      title: "React",
      progress: 35,
    },
    {
      title: "Java",
      progress: 50,
    },
    {
      title: "DSA",
      progress: 90,
    },
  ]);

  console.log(courses);

  return (
    <>
    <div>
      <Header />
      <div style={{padding: '20px',  fontFamily: 'Arial, sans-serif'}}>


{/*
        <h1>Student Dashboard</h1>

         Courses Overview Section 
        <ul>
        <li>Courses : 0</li>
        <li>Internships : 0</li>
        <li>Projects : 0</li>
        </ul>
        */}


        {/* Student Overview Section */}
        <div>
          <h2>Welcome Student </h2>
          <p>Your Learning Overview</p>
        </div>

        {/* Enrolled Courses */}
        <div>
        <h3>Enrolled Courses</h3>
        {courses.map((course) => (
          <>
          <CourseCard title={course.title} progress={course.progress}/>
          </>
        ))}

        {/*}
        <p>Course Progress : {progress}</p>
        <button onClick={()=>{
          setCourses([...courses,"Mongo DB"]);
        }}>Add Course</button>
        <CourseCard title="React" progress={45} />
        <CourseCard title="Java" progress={50} />
        <CourseCard title="DSA" progress={90} />
        */}

        </div>

        {/* Skills Progress 
      <div>
        <h3>Skill Progress</h3>
        <p>AI Fundamentals: 70%</p>
        <p>Python Programming: 85%</p>
        <p>Data Analysis: 60%</p>
      </div>

      {/* Internships Applications 
      <div>
        <h3>Internship Status</h3>
        <ul>
          <li>Front End - Under Review</li>
          <li>Back End - Shortlisted</li>
        </ul>
      </div>
      */}

      </div>
    </div>
    </>
  )
}