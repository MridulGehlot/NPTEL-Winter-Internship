import CourseCard from '../component/CourseCard';
import Header from '../component/Header';
import {useState,useMemo, useEffect,useCallback} from 'react';
import EnrollmentCard from '../component/EnrollmentCard';
import SearchBar from '../component/SearchBar';
import Courses from '../data/Courses.json';
import {Link} from 'react-router-dom';
import type { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import LoginPanel from '../component/LoginPanel';

type DashboardProps={
  studentName:string;
}


export default function Dashboard({studentName}:DashboardProps) {

  const studentNameLocal=studentName;
  console.log(studentNameLocal);


  const [progress,setProgress] = useState<number>(40);
  const [reactProgress,setReactProgress] = useState<number>(40);
  const [enrolled,setEnrolled]=useState<boolean>(false);
  const [student,setStudent]=useState({
    name: "Amit",
    course : "Full Stack Development",
    progress : "45%",
  });
  const [courses,setCourses]=useState(Courses);

  console.log(courses);

  const handleEnroll=()=>{
    setEnrolled(true);
  }

  const isLoggedIn=useSelector((state:RootState)=>state.auth.isLoggedIn);
  const username=useSelector((state:RootState)=>state.auth.username);

  const [someCourses]=useState(5);
  const handleLike=useCallback(()=>{
    setLikes((prev)=>prev+1);
  },[]);
  const [likes,setLikes]=useState<number>(0);
  function calculateLikes(likes:number)
  {
    console.log("Heavy Calculation...");
    let total=0;
    for(let i=0;i<1000000000;i++)
    {
      total+=i;
    }
    return someCourses*10;
  }
  // useEffect(()=>{
  //   calculatedLikes;
  //   console.log("Calculated Likes:",calculatedLikes);
  // },[]);

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

        <LoginPanel handleLike={handleLike}/>

        {/* Student Overview Section */}
        <div>
          <h2>Welcome Student </h2>
          <p>Your Learning Overview</p>
        </div>

        <nav style={{display:"flex",gap:"20px"}}>
          <Link to="/courses">Courses</Link>
          <Link to="/profile">Profile</Link>
          <p>Like : {likes}</p>
          {/* <div>
            {isLoggedIn?(<p>Welcome , {username}</p>):(<p>Please log in</p>)}
          </div> */}
        </nav>

        <SearchBar />

        {/* Enrolled Courses */}
        <div>
        <h3>Enrolled Courses</h3>

        <EnrollmentCard onEnroll={handleEnroll} />
        <p>Status : {enrolled ? "Enrolled" : "Not Enrolled"}</p>
        
        {courses.length===0?(
          <p>No courses enrolled yet.</p>
        ):courses.map((course)=>(
          <CourseCard title={course.title} level={course.level} students={course.students}/>
        ))}

        {/* {courses.map((course) => (
          <>
          <CourseCard title={course.title} progress={course.progress}/>
          </>
        ))} */}

        {/* <CourseCard title="React" progress={reactProgress} />
        <button onClick={()=>setReactProgress(reactProgress+10)}>Complete React Lesson</button> */}

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