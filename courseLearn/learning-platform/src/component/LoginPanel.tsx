import {login,logout} from '../store/authSlice';
import { useDispatch } from 'react-redux';

export default function LoginPanel({handleLike}:any){
    const dispatch=useDispatch();

    const handleLogin=()=>{
        dispatch(login("Amit"));
    };

    const handleLogout=()=>{
        dispatch(logout());
    };

    return (
        <>
        <div>
            <button onClick={handleLike}>Like</button>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
        </>
    );

}