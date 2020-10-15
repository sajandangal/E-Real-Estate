import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';

import Axios from 'axios'
import { Container, Alert, Form, FormGroup, Input, Button, CustomInput, FormText } from 'reactstrap';
import FileUploadButton from './FileUploadButton'


export default class EditProperty extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible1: false,
            visible2: false,
            user: {},
            properties: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
        }
    }
    handleChange = (e) => {
        this.setState({
            properties: { ...this.state.properties, [e.target.name]: e.target.value }
        })
    }
    //LOAD DATA
    componentDidMount() {
        Axios.get('http://localhost:3001/users/myProfile', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    user: response.data
                })
            })
            .catch((err) => console.log(err.response));

        Axios.get('http://localhost:3001/properties/' + (this.props.match.params.id), this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    properties: response.data
                })
            })
            .catch((err) => console.log(err.response));
    }


    //ALERT MANAGEMENT FUNCTION
    toogle() {
        this.setState({
            visible1: !this.state.visible1
        })

    }

    //For Image
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
                    properties: { ...this.state.properties, image: response.data.filename },
                    visible1: true,
                })
            }).catch((err) => console.log(err.response))
    }

    updateProperty = (e) => {
        e.preventDefault();
        Axios.put('http://localhost:3001/properties/' + (this.props.match.params.id), this.state.properties, this.state.config)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    visible2: true
                })
            })
            .catch((err) => console.log(err.response))
        this.props.history.push('/myPropertyList');
    }

    render() {
        const { propertyId } = this.props
        return (
            <div>
                <div className="add ">
                    <div className="addProperty">
                        <div className="headText card-header h4 text-primary">
                            Update your property from here.
                    </div>
                        <FormGroup>
                            <Alert color="success" isOpen={this.state.visible1} toggle={this.toogle.bind(this)}>Image updated Successfully. </Alert>
                        </FormGroup>
                        <Form>
                            <label>Please Select Image of your property</label>
                            <FormGroup>
                                <img className='img-thumbnail'
                                    width='400' src={`http://localhost:3001/uploads/${this.state.properties.image}`}
                                    alt="Property Image" />
                                <CustomInput type='file' id='image'
                                    onChange={this.handleFileSelect} />
                                {this.state.selectedFile ? (<FileUploadButton
                                    uploadFile={this.uploadFile} />) : null}
                            </FormGroup>
                            <FormGroup>
                                <label for="propertyTitle">Title Of Property</label>
                                <Input type='text' name='title' id='title' value={this.state.properties.title}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="propertyAddress">Address</label>
                                <Input type='text' name='address' id='owner' value={this.state.properties.address}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="propertyDescription">Description</label>
                                <textarea name="description" rows="5" class="form-control" id="description" name='description'
                                    aria-describedby="description" placeholder="Provide detail about the Property"
                                    value={this.state.properties.description} onChange={this.handleChange}
                                    required>
                                </textarea>
                            </FormGroup>
                            <FormGroup>
                                <label for="propertyPrice">Price</label>
                                <Input type='number' name='price' id='price' value={this.state.properties.price}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="category">Category</label>
                                <Input type="select" name="category" id="category" value={this.state.properties.category} onChange={this.handleChange}>
                                    <option>Select category of your property</option>
                                    <option>Appartment</option>
                                    <option>Residental</option>

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <label for="purpose">Purpose</label>
                                <Input type="select" name="purpose" id="purpose" value={this.state.properties.purpose} onChange={this.handleChange}>
                                    <option>Select purpose of your property</option>
                                    <option>For Sell</option>
                                    <option>For Rent</option>

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <label for="facility">First facility</label>
                                <Input type='text' name='facility1' id='facility1' value={this.state.properties.facility1}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="facility">Second facility</label>
                                <Input type='text' name='facility2' id='facility2' value={this.state.properties.facility2}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="facility">Third facility</label>
                                <Input type='text' name='facility3' id='facility3' value={this.state.properties.facility3}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="facility">Fourth facility</label>
                                <Input type='text' name='facility4' id='facility4' value={this.state.properties.facility4}
                                    onChange={this.handleChange} required />
                            </FormGroup>


                            <label for="propertyRoom">Rooms Of Property</label>
                            <FormGroup>
                                <label for="Rooms">Bed Room</label>
                                <Input type='number' name='bedroom' id='bedroom' value={this.state.properties.bedroom}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="Rooms">Living Room</label>
                                <Input type='number' name='livingroom' id='livingroom' value={this.state.properties.livingroom}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="Rooms">kitchen Room</label>
                                <Input type='number' name='kitchen' id='kitchen' value={this.state.properties.kitchen}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="Rooms">Bath Room</label>
                                <Input type='number' name='bathroom' id='bathroom' value={this.state.properties.bathroom}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>

                                <Alert color="success" isOpen={this.state.visible2} >Property Updated Successfully. </Alert>
                            </FormGroup>
                            <Button color="success" type="submit" onClick={this.updateProperty}>Update Property</Button>
                        </Form>
                    </div>
                </div>

            </div>
        )
    }
}
