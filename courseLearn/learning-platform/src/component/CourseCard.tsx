type CourseCardProps={
    title:string,
    progress:number
}

export default function CourseCard(props:CourseCardProps)
{
    return (
    <>
    <div style={{
        border: "1px solid #ddd",
        padding: "14px",
        borderRadius: "8px",
        marginBottom: "12px",
    }}>
        <h3>{props.title}</h3>
        <p>Progress: {props.progress}%</p>
        <button>Enroll Now</button>
    </div>
    </>
    )
}
 
{/*
import React,{Component} from "react";

class CourseCard extends Component{
    render()
    {
        return <h3>React</h3>
    }
}

export default CourseCard;
*/}