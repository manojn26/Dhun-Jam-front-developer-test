import React, { useState, useContext } from 'react'
import "./styles/LoginScreen.css"
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { AppContext } from '../App';



export default function LoginScreen() {


    const { setUserAuth } = useContext(AppContext)

    const [show, setShow] = useState(false);
    const [type, setType] = useState(false);
    const [userName, setUserName] = useState("")
    const [userPassword, setUserPassword] = useState("")

    function userNameInputHandler(e) {
        setUserName(e.target.value)
    }

    function userPasswordHandler(e) {
        setUserPassword(e.target.value)
    }


    function togglePassword() {
        setShow(!show)
        setType(!type)
    }

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault()

        // POST API
        await axios.post("https://stg.dhunjam.in/account/admin/login", {
            username: userName,
            password: userPassword
        }).then((res) => {
            // Set the User Details for GlobalContext
            setUserAuth({
                id: res?.data.data?.id,
                response: res?.data?.response
            })

        }).catch((err) => {
            console.log(err);
        })
        navigate("/dashboard")
    }



    return (
        <div className='parent-container'>
            <div className='form-conainer'>
                <h1>Venue Admin Login</h1>
                <form onSubmit={submitHandler}>
                    <div className='user-name'>
                        <label htmlFor="user-name">User Name</label>
                        <input required value={userName} onChange={userNameInputHandler} />
                    </div>
                    <br />
                    <div className='user-password'>
                        <label htmlFor="user-password">Password</label>
                        <input required type={type ? "text" : "password"} onChange={userPasswordHandler} />
                        <div className='password-icon'>
                            <span onClick={togglePassword}>{show ? <IoEyeOutline /> : <FaRegEyeSlash />}</span>
                        </div>
                    </div>
                    <br />
                    <div className='submit-button'>
                        <button type='submit'>Sign In</button>
                    </div>

                </form>
                {/* New Registration Logic not implemented */}
                <div>
                    <p>New Registration ?</p>
                </div>

            </div>

        </div>

    )
}
