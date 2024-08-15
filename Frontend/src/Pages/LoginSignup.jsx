import React, { useState } from 'react'
import './CSS/loginSignUp.css'


const LoginSignup = () => {

    const [state, setState] = useState("Sign Up");
    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        password: "",

    });

    const changeHandler = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value })
    }

    const login = async () => {

        let responseData;

        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                "Accept": 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata),
        }).then((response) => response.json()).then((data) => responseData = data)
        console.log(responseData);


        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/home");
        } else {
            alert(responseData.error);
        }

    }

    const signup = async () => {

        let responseData;

        await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                "Accept": 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata),
        }).then((response) => response.json()).then((data) => responseData = data)
        console.log(responseData);


        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/home");
        } else {
            alert(responseData.error);
        }


    }


    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input name='name' value={formdata.name} onChange={changeHandler} type='text' placeholder='Your name' /> : <></>}
                    <input name='email' value={formdata.email} type='email' onChange={changeHandler} placeholder='Your email address' />
                    <input name='password' value={formdata.password} onChange={changeHandler} type='password' placeholder='password' />

                </div>
                <button onClick={() => { state === "Sign Up" ? signup() : login() }}>Continue</button>
                {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account <span onClick={() => { setState("Login") }}>login here</span></p> :
                    <p className='loginsignup-login'>Create an account <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing I agree to the terms of use and privacy policy.</p>

                </div>


            </div>
        </div>
    )
}

export default LoginSignup