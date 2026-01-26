import {useState} from 'react';

export default function SearchBar(){

    const [query,setQuery]=useState<string>("");

    return (
        <>
        <div>
            <input
            type="text"
            placeholder="Search Courses"
            value={query}
            onChange={(e)=> setQuery(e.target.value)}
            />
            <p>Searching for : {query}</p>
        </div>
        </>
    );
}