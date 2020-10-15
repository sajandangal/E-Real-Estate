import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import axios from 'axios'
import { Container, Form, FormGroup, Input, Button, FormText } from 'reactstrap';


class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profilePicture: '',
            fullName: '',
            phone: '',
            address: '',
            email: '',
            password: '',
            cpassword: '',
            isRegistered: false
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/users/signup', this.state)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token)
                this.setState({
                    fullName: '',
                    phone: '',
                    address: '',
                    email: '',
                    password: '',
                    cpassword: '',
                    isRegistered: true
                });
            }).catch((err) => console.log(err))
    }

    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to='/dashboard' />
        }
        return (
            <Container>

                <div className="signinform">
                    <h2>
                        Sign Up Form
                </h2>
                    <Form>

                        <FormGroup>
                            <label for='userfullName'>
                                Your Full Name:
    </label>
                            <Input type='text' name='fullName' id='fullName'
                                value={this.state.fullName} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <label for='userphone'>
                                Your Phone Number:
    </label>
                            <Input type='text' name='phone' id='phone'
                                value={this.state.phone} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <label for='useraddress'>
                                Your Address:
    </label>
                            <Input type='text' name='address' id='address'
                                value={this.state.address} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <label for='useremail'>
                                Your email/username:
    </label>
                            <Input type='text' name='email' id='email'
                                value={this.state.email} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <label for='userpassword'>
                                Your password:
    </label>
                            <Input type='password' name='password' id='password'
                                value={this.state.password} onChange={this.handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <label for='userCpassword'>
                                Confirm your password:
    </label>
                            <Input type='password' name='cpassword' id='cpassword'
                                value={this.state.cpassword} onChange={this.handleChange} />
                        </FormGroup>

                        <Button color="success" type="submit" onClick={this.handleSubmit}>Sign Up</Button>
                        <FormText>
                            <Link to='/login'>Back to Login.</Link>
                        </FormText>

                    </Form>
                </div>

            </Container>
        );
    }
}

export default SignUpForm;
