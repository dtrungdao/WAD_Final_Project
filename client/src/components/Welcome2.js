import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../css/Welcome2.css";
import { NavLink } from "react-router-dom";



function Welcome2(){
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
        {
        username: "username1",
        password: "1234"
        },
        {
        username: "username2",
        password: "12345"
        }
    ];

    const errors = {
        uname: "Invalid username. Please try again",
        pass: "Invalid password. Please try again"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
    
        var { uname, pass } = document.forms[0];
    
        // Find user login info
        const userData = database.find((user) => user.username === uname.value);
    
        // Compare user info
        if (userData) {
        if (userData.password !== pass.value) {
            // Invalid password
            setErrorMessages({ name: "pass", message: errors.pass });
        } else {
            setIsSubmitted(true);
        }
        } else {
        // Username not found
        setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
    );


    // JSX code for login form
    const renderForm = (
        <div className="form">
        <form onSubmit={handleSubmit}>
            <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required />
            {renderErrorMessage("uname")}
            </div>

            <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
            {renderErrorMessage("pass")}
            </div>

            <div className="button-container">
            <input type="submit" value="Log in"/>
            </div>
        </form>
        </div>
    );


    return (
        <div className = "welcome2">
            <div className="login-form">
                <div className="title">Welcome to Badminton Club Schöneweide</div>
                <div className="title2">Our club is open from 8am to 10pm every day.
                5 badminton courts with international standards are put into operation.
                In addition, we also have bathrooms, sauna services and racket / badminton rentals.</div>
                <div className="title2">Log in your account to reserve a court</div>

                {isSubmitted ?
                    <NavLink className="nav-link" to="/">
                        Log in successfully, click here to continue
                    </NavLink>: renderForm}
            </div>
        </div>
    )

}

export default Welcome2;