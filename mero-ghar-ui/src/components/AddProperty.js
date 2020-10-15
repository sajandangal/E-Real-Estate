import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';

import Axios from 'axios'
import { Container, Alert, Form, FormGroup, Input, Button, CustomInput, FormText } from 'reactstrap';
import FileUploadButton from './FileUploadButton'

export default class AddProperty extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible1: false,
            visible2: false,
            user: {},
            property: {},
            image: null,
            title: null,
            address: null,
            category: null,
            purpose: null,
            description: null,
            price: null,
            owner: null,

            facility1: null,
            facility2: null,
            facility3: null,
            facility4: null,

            bedroom: null,
            livingroom: null,
            kitchen: null,
            bathroom: null,

            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            selectedFile: null,
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    toogle() {
        this.setState({
            visible1: !this.state.visible1
        })

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
        // Axios.get('http://localhost:3001/properties', this.state.config)
        //     .then((response) => {
        //         console.log(response.data)
        //         this.setState({
        //             property: response.data
        //         })
        //     })
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
                    //user: { ...this.state.user, image: response.data.filename }
                    image: response.data.filename,
                    visible1: true,
                    title: this.state.title,
                    address: this.state.address,
                    category: this.state.category,
                    purpose: this.state.purpose,
                    description: this.state.description,
                    price: this.state.price,
                    owner: this.state.user._id,

                    facility1: this.state.facility1,
                    facility2: this.state.facility2,
                    facility3: this.state.facility3,
                    facility4: this.state.facility4,

                    bedroom: this.state.bedroom,
                    livingroom: this.state.livingroom,
                    kitchen: this.state.kitchen,
                    bathroom: this.state.bathroom

                })
            }).catch((err) => console.log(err.response))
    }

    addProperty = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:3001/properties',
            {
                image: this.state.image,

                title: this.state.title,
                address: this.state.address,
                category: this.state.category,
                purpose: this.state.purpose,
                description: this.state.description,
                price: this.state.price,
                owner: this.state.user._id,

                facility1: this.state.facility1,
                facility2: this.state.facility2,
                facility3: this.state.facility3,
                facility4: this.state.facility4,

                bedroom: this.state.bedroom,
                livingroom: this.state.livingroom,
                kitchen: this.state.kitchen,
                bathroom: this.state.bathroom
            }, this.state.config)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    visible2: true,
                    image: '',

                    title: '',
                    address: '',
                    category: '',
                    purpose: '',
                    description: '',
                    price: '',
                    owner: '',

                    facility1: '',
                    facility2: '',
                    facility3: '',
                    facility4: '',

                    bedroom: '',
                    livingroom: '',
                    kitchen: '',
                    bathroom: ''
                })
            })
            .catch((err) => console.log(err.response))
    }

    render() {
        return (
            <div id='root'>

                <div className="add ">
                    <div className="addProperty">
                        <div className="headText card-header h4 text-success">
                            Add your property from here.
                    </div>
                        <FormGroup>
                            <Alert color="success" isOpen={this.state.visible1} toggle={this.toogle.bind(this)}>Image Added Successfully. </Alert>
                        </FormGroup>
                        <Form>
                            <label>Please Select Image of your property</label>
                            <FormGroup>
                                {/* <img className='img-thumbnail'
                                width='400' src={`http://localhost:3001/uploads/${this.state.property.image}`}
                                alt="Property Image" /> */}
                                <CustomInput type='file' id='image'
                                    onChange={this.handleFileSelect} />
                                {this.state.selectedFile ? (<FileUploadButton
                                    uploadFile={this.uploadFile} />) : null}
                            </FormGroup>
                            <FormGroup>
                                <label for="propertyTitle">Title Of Property</label>
                                <Input type='text' name='title' id='title' value={this.state.title}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="propertyAddress">Address</label>
                                <Input type='text' name='address' id='owner' value={this.state.address}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="propertyDescription">Description</label>
                                <textarea name="description" rows="5" class="form-control" id="description" name='description'
                                    aria-describedby="description" placeholder="Provide detail about the Property"
                                    value={this.state.description} onChange={this.handleChange}
                                    required>
                                </textarea>
                            </FormGroup>
                            <FormGroup>
                                <label for="propertyPrice">Price</label>
                                <Input type='number' name='price' id='price' value={this.state.price}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="category">Category</label>
                                <Input type="select" name="category" id="category" value={this.state.category} onChange={this.handleChange}>
                                    <option>Select category of your property</option>
                                    <option>Appartment</option>
                                    <option>Residental</option>

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <label for="purpose">Purpose</label>
                                <Input type="select" name="purpose" id="purpose" value={this.state.purpose} onChange={this.handleChange}>
                                    <option>Select purpose of your property</option>
                                    <option>For Sell</option>
                                    <option>For Rent</option>

                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <label for="facility">First facility</label>
                                <Input type='text' name='facility1' id='facility1' value={this.state.facility1}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="facility">Second facility</label>
                                <Input type='text' name='facility2' id='facility2' value={this.state.facility2}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="facility">Third facility</label>
                                <Input type='text' name='facility3' id='facility3' value={this.state.facility3}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="facility">Fourth facility</label>
                                <Input type='text' name='facility4' id='facility4' value={this.state.facility4}
                                    onChange={this.handleChange} required />
                            </FormGroup>


                            <label for="propertyRoom">Rooms Of Property</label>
                            <FormGroup>
                                <label for="Rooms">Bed Room</label>
                                <Input type='number' name='bedroom' id='bedroom' value={this.state.bedroom}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="Rooms">Living Room</label>
                                <Input type='number' name='livingroom' id='livingroom' value={this.state.livingroom}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="Rooms">kitchen Room</label>
                                <Input type='number' name='kitchen' id='kitchen' value={this.state.kitchen}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>
                                <label for="Rooms">Bath Room</label>
                                <Input type='number' name='bathroom' id='bathroom' value={this.state.bathroom}
                                    onChange={this.handleChange} required />
                            </FormGroup>
                            <FormGroup>

                                <Alert color="success" isOpen={this.state.visible2} >Property Added Successfully. </Alert>
                            </FormGroup>
                            <Button color="success" type="submit" onClick={this.addProperty}>Add Property</Button>
                        </Form>
                    </div>
                </div>

            </div>
        )
    }
}
