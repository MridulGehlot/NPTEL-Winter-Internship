import {useRef,useEffect, useState} from 'react';
import axiosInstance from '../helpers/axiosInstance';
export default function Courses()
{
    const [searchTerm,setSearchTerm]=useState<string>('');
    const [posts,setPosts]=useState<any[]>([]);
    const searchRef=useRef<HTMLInputElement|null>(null);
    const getData=async ()=>{
        const response=await axiosInstance.get('/posts');
        console.log(response.data);
        //setPosts(response.data);
        //localStorage.setItem("posts",response.data);
        sessionStorage.setItem("posts",response.data);
    };
    useEffect(()=>{
        //const cachedPosts=localStorage.getItem("posts");
        const cachedPosts=sessionStorage.getItem("posts");
        if(!cachedPosts) getData();
        //if(cachedPosts) setPosts(JSON.parse(cachedPosts));
        if(cachedPosts) console.log("Cached Data: ",cachedPosts);
        //searchRef.current?.focus();
    },[]);
    return (
        <>
        {/* <input ref={searchRef} value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder="Search Courses..."></input>
        <h1>Courses</h1>
        <p>Searching for : {searchTerm}</p> */}

        {
            posts && posts?.map((post)=>(
                <div key={post.id} style={{border:'1px solid black',margin:'10px',padding:'10px'}}>
                    <h3>Title : {post.title}</h3>
                    <p>Body : {post.body}</p>
                </div>
            ))
        }

        </>
    );
}