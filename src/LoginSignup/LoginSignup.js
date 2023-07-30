import React, {useState} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import "./LoginSignup.css"

function LoginSignup() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('login');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }
    return (
        <div>
            {isLoggedIn ? (
                <div>Welcome! You are now logged in.</div>
            ) : (
                <div>
                    <h1>
                    TG-Solver
                    </h1>
                    <Tabs className="Hebrew"
                          activeKey={activeTab} onSelect={handleTabChange}>

                        <Tab
                            eventKey="login"
                            // title="Login"
                            title="התחברות">
                            <LoginScreen setIsLoggedIn={setIsLoggedIn}/>
                        </Tab>
                        <Tab
                            eventKey="signup"
                            // title="Signup"
                            title="הרשמה">
                            <SignupScreen setIsLoggedIn={setIsLoggedIn}/>
                        </Tab>
                    </Tabs>
                </div>

            )}
        </div>
    );
}

export default LoginSignup;
