import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {useState } from 'react'
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase';
import { useLoginMutation } from '../redux/api/userAPI';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { MessageResponse } from '../types/api-types';

function Login() {
    
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const [login] = useLoginMutation();

    const loginHandler = async () => {
        try{
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);
            const res = await login({
            name:user.displayName!,
            email:user.email!,
            photo:user.photoURL!,
            gender,
            dob:date,
            _id:user.uid
            })
            if("data" in res){
                toast.success(`Welcome, ${user.displayName}`)
            }
            else{
                const error = res.error as FetchBaseQueryError;
                const message = (error.data as MessageResponse).message;
                toast.error(message)
            }
            // console.log(user);
        }
        catch(err){
            toast.error("SignIn failed");
        }
    };
    return(
        <div className='login'>
            <main>
            <h1 className='heading'>Login </h1>
              <div>
                <label>Gender</label>
                <select value={gender} onChange={(e)=> setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">female</option>
                </select>

              </div>
            <div>
                <label>Date of Birth</label>
                <input type="date" value={date} onChange={(e)=> setDate(e.target.value)}/>
            </div>  

            <div>
                <p>Already Signed in Once</p>
                <button onClick={loginHandler}>
                    <FcGoogle /> <span>Sign in with Google</span>
                </button>
            </div>
            </main>
        </div>
    )
}

export default Login;