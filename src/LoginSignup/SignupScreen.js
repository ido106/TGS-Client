import React from 'react';
import { Form, Button} from 'react-bootstrap';

function SignupScreen(setIsLoggedIn) {
    const handleSignup = (event) => {
        event.preventDefault();
        // handle signup logic here
        setIsLoggedIn(true);
    }

    return (
        <Form onSubmit={handleSignup}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>
                    {/*Email address*/}
                    כתובת אימייל
                </Form.Label>
                <Form.Control className="Hebrew"
                    type="email"
                              // placeholder="Enter email"
                              placeholder="הכנס אימייל"
                              required />
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
                              required />
            </Form.Group>

            <Form.Group controlId="formBasicPasswordConfirm">
                <Form.Label>
                    {/*Confirm Password*/}
                    אימות סיסמא
                </Form.Label>
                <Form.Control className="Hebrew"
                    type="password"
                              //placeholder="Confirm Password"
                              placeholder="אימות סיסמא"
                              required />
            </Form.Group>

            <Button variant="primary" type="submit">
                {/*Sign Up*/}
                הרשם
            </Button>
        </Form>
    );
}

export default SignupScreen;
