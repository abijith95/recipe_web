 import {useState} from "react";
 import axios from "axios";
 import { useCookies } from 'react-cookie';
 import {useNavigate} from 'react-router-dom';
 export const Auth = () => {
    return (
        <div className="Auth">
        <Login/>
        <Register/>
        </div>
    );
};
const Login  = () => {
    const [_,setCookies] = useCookies(["access_token"]);
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
     const navigate = useNavigate()
    const onSubmit = async (event)=>{
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:3002/auth/login",
            {username,password});
           setCookies("access_token",response.data.token);
           window.localStorage.setItem("userid",response.data.userid)
           alert("login sucessfull!")
           navigate("/")
        }catch(err){
            console.error(err);
        }
    }
    return (
        <Form 
        username={username}
        setUsername={setUsername}
        pssword={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
        />
    )
}


const Register  = () => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const onSubmit = async (event) => {
         event.preventDefault();
         try{
            await axios.post("http://localhost:3002/auth/register ",
            {username,password});
         alert("Registration Successfully completed");
         }
         catch (err){
               console.error(err);
         }
    };
    return <Form 
    username={username}
    setUsername={setUsername}
    pssword={password}
    setPassword={setPassword}
    label="Sign Up"
    onSubmit={onSubmit}
    />
    
};


const Form = ({username,setUsername,password,setPassword,label,onSubmit}) =>{
    return (
        <div className="authbox">
        <form onSubmit={onSubmit}>
            <h2>{label}</h2>
            <div className="form">
              <label htmlFor="username">Username:</label>
              <input type="text"  id="username" value={username} onChange={(event)=>setUsername(event.target.value)}/>
            </div>
            <div className="form">
              <label htmlFor="password">Password:</label>
              <input type="password"  id="password"  value={password} onChange={(event)=>setPassword(event.target.value)}/>
            </div>
            <button type="Submit">{label}</button>
        </form>

    </div>
    )
}