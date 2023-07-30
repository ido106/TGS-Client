import React from 'react';
// import { GoogleLogin } from 'react-google-login';
import {Form, Button} from 'react-bootstrap';

const LoginScreen = (setIsLoggedIn) => {
    const onSuccess = (res) => {
        setIsLoggedIn(true);
        console.log(res);
    }

    const onFailure = (res) => {
        setIsLoggedIn(false);
        console.log(res);
    }
    const handleLogin = (event) => {
        event.preventDefault();
        // handle login logic here
        setIsLoggedIn(true);
    }
    return (
        <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>
                    {/*Email address*/}
                    כתובת אימייל
                </Form.Label>
                <Form.Control className="Hebrew"
                    type="email"
                    //placeholder="Enter email"
                    placeholder="הכנס אימייל"
                    required/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>
                    {/*Password*/}
                    סיסמא
                </Form.Label>
                <Form.Control className="Hebrew"
                    type="password"
                    // placeholder="Password"
                    placeholder="סיסמא"
                    required/>
            </Form.Group>
            <Button variant="primary" type="submit">
                {/*Submit*/}
                התחבר
            </Button>
            {/*<GoogleLogin*/}
            {/*    clientId="YOUR_CLIENT_ID"*/}
            {/*    render={renderProps => (*/}
            {/*        <Button onClick={renderProps.onClick} variant="secondary" style={{marginLeft: "10px"}}>*/}
            {/*            Login with Google*/}
            {/*        </Button>*/}
            {/*    )}*/}
            {/*    onSuccess={onSuccess}*/}
            {/*    onFailure={onFailure}*/}
            {/*/>*/}
        </Form>

    );
}

export default LoginScreen;
