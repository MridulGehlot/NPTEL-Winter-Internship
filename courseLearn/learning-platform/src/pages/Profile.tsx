import { useReducer } from "react";
type ProfileState={
    name:string;
    email:string;
    step:number;
}

type Action=
| {type:"SET_NAME",payload:string}
| {type:"SET_EMAIL",payload:string}
| {type:"NEXT_STEP"};

export default function Courses()
{

    const initialState:ProfileState={
        name:"",
        email:"",
        step:1,
    };
    const [state,dispatch]=useReducer(profileReducer,initialState);

    function profileReducer(state:ProfileState,action:Action):ProfileState
    {
        switch(action.type)
        {
            case "SET_NAME":
                return {...state,name:action.payload};
            case "SET_EMAIL":
                return {...state,email:action.payload};
            case "NEXT_STEP":
                return {...state,step:state.step+1};
            default:
                return state;
        }
    }
    return (
        <>
        <div>
            <h2>Profile Setup</h2>
            {state.step==1 && (
                <div>
                    <input
                    type="text"
                    placeholder="Enter your name"
                    value={state.name}
                    onChange={(e)=>dispatch({type:"SET_NAME",payload:e.target.value})}
                    ></input>
                    <button onClick={()=>dispatch({type:"NEXT_STEP"})}>Next</button>
                </div>
            )}

            {state.step==2 && (
                <div>
                    <input
                    type="text"
                    placeholder="Enter your email"
                    value={state.email}
                    onChange={(e)=>dispatch({type:"SET_EMAIL",payload:e.target.value})}
                    ></input>
                    <button onClick={()=>dispatch({type:"NEXT_STEP"})}>Finish</button>
                </div>
            )}

            {state.step===3 && (
                <div>
                    <h3>Profile Summary</h3>
                    <p>Name: {state.name}</p>
                    <p>Email: {state.email}</p>
                </div>
            )}

        </div>
        </>
    );
}