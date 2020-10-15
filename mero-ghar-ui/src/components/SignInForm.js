import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import axios from 'axios'

import { Container, Form, FormGroup, Input, Button, FormText } from 'reactstrap';

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoggedIn: false
        }
    }

    handleChange = (e) => {
        this.setState(
            { [e.target.name]: e.target.value }
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/users/login', this.state)
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('token', response.data.token)
                this.setState({
                    isLoggedIn: true
                })


                // return <Link to='/signup'>Create from here.</Link>
            }).catch((err) => console.log(err.response))
        this.setState({ email: '', password: '' })
    }

    render() {
        if (this.state.isLoggedIn) {
            return <Redirect to='/dashboard' />
        }
        // if (this.state.isLoggedIn === true) {
        //     return <Redirect to='/' />
        // }
        return (
            <Container>
                <div className="signinform">

                    <h2>
                        Sign In Form
                </h2>

                    <Form>

                        <FormGroup>
                            <label for='useremail'>
                                Your email/username:
                        </label>
                            <Input type='text' name='email' id='email' value={this.state.email}
                                onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label for='userpassword'>
                                Your password:
                        </label>
                            <Input type='password' name='password' id='password' value={this.state.password} onChange={this.handleChange} />
                        </FormGroup>

                        <Button color="success" type="submit" onClick={this.handleSubmit}>Login</Button>
                        <FormText>
                            Don't have an account ?
                        <Link to='/signup'>Create from here.</Link>
                        </FormText>
                    </Form>
                </div>
            </Container>
        );
    }
}

export default SignInForm;
