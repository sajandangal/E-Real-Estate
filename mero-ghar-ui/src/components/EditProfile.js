import React, { Component } from 'react'
import Axios from 'axios'
import { Form, FormGroup, Input, Button, Label, CustomInput, Container } from 'reactstrap'
import FileUploadButton from './FileUploadButton'

export default class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            config: {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            },
            selectedFile: null,

        }
    }

    componentDidMount() {

        Axios.get('http://localhost:3001/users/myProfile', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    user: response.data
                })
            })
            .catch((err) => console.log(err.response));
    }



    handleFileSelect = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    uploadFile = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('imageFile', this.state.selectedFile)
        Axios.post('http://localhost:3001/upload', data, this.state.config)
            .then((response) => {
                this.setState({
                    user: { ...this.state.user, profilePicture: response.data.filename }
                })
            }).catch((err) => console.log(err.response))
    }

    updateUser = (e) => {
        e.preventDefault();
        Axios.put('http://localhost:3001/users/myProfile', this.state.user, this.state.config)
            .then((response) => console.log(response.data)).catch((err) => console.log(err.response))
        this.props.history.push('/dashboard');
    }

    handleChange(e) {
        this.setState({
            user: { ...this.state.user, [e.target.name]: e.target.value }
        })
    }

    render() {
        if (this.state.user === {}) {
            return <h3>Loading ...</h3>

        } else {
            return (
                <div >
                    <div className="add_user_Main shadow-sm ">
                        <Container className='mt-4'>
                            <Form>
                                <FormGroup>
                                    <h2 color='#B8B8B8;'>Update Profile Form</h2>

                                </FormGroup>
                                <FormGroup >
                                    <img className='img-thumbnail userImage'
                                        width='400' src={`http://localhost:3001/uploads/${this.state.user.profilePicture}`}
                                        alt="profile" />
                                    <CustomInput type='file' id='profilePic'
                                        onChange={this.handleFileSelect} />
                                    {this.state.selectedFile ? (<FileUploadButton
                                        uploadFile={this.uploadFile} />) : null}
                                </FormGroup>

                                <FormGroup>
                                    <Label for='fullName'>Full Name</Label>
                                    <Input type='text'
                                        id="fullName"
                                        name='fullName'
                                        value={this.state.user.fullName}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='phone'>Phone</Label>
                                    <Input type='text'
                                        id='phone'
                                        name='phone'
                                        value={this.state.user.phone}
                                        onChange={(e) => this.handleChange(e)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='email'>Email</Label>
                                    <Input type='text'
                                        id='email'
                                        name='email'
                                        value={this.state.user.email}
                                        onChange={(e) => this.handleChange(e)} disabled />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='address'>Address</Label>
                                    <Input type='text'
                                        id='address'
                                        name='address'
                                        value={this.state.user.address}
                                        onChange={(e) => this.handleChange(e)} />
                                </FormGroup>

                                <Button color='danger' onClick={this.updateUser} block>Update User</Button>
                            </Form>
                        </Container>
                    </div>
                </div>
            )
        }
    }
}
