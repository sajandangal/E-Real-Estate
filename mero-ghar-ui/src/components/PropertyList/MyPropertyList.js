import React, { Component } from 'react'
import Axios from 'axios'
import { Container, Alert, Modal, Form, FormGroup, ModalBody, ModalHeader, Input, Button, ListGroup, CustomInput, FormText } from 'reactstrap';
import FileUploadButton from '../FileUploadButton'
import { Link } from 'react-router-dom';

export default class MyPropertyList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isActive: false,
            visible1: false,
            properties: [],
            editProperty: [],
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            propertyId: ''
        }
    }

    // componentWillMount() {
    //     Modal.setAppElement('body')
    // }



    componentDidMount() {

        Axios.get('http://localhost:3001/properties/myProperties', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    properties: response.data
                })
            })
            .catch((err) => console.log(err.response));

        Axios.get('http://localhost:3001/users/myProfile', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    user: response.data
                })
            })
            .catch((err) => console.log(err.response));
    }
    toogle() {
        this.setState({
            visible1: !this.state.visible1
        })
    }
    toggleModal = () => {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    deleteProperty = (propertyId) => {
        Axios.delete(`http://localhost:3001/properties/${propertyId}`, this.state.config)
            .then((response) => {
                const filteredProperties = this.state.properties.filter((property) => {
                    return property._id !== propertyId
                })
                this.setState({
                    visible1: true,
                    properties: filteredProperties
                })
            }).catch((err) => console.log(err.response));
    }

    render() {
        // const { property, handlePropertyDelete, handlePropertyEdit, itemClick } = this.props

        return (
            <div className="myPropTable">

                <Alert color="danger" isOpen={this.state.visible1} toggle={this.toogle.bind(this)}>Property had been removed...</Alert>


                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Purpose</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                            <th scope="col">More Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.properties.map(property => {
                                return (<tr key={property._id}>
                                    <th scope="row">
                                        <img className='img-thumbnail userImage'
                                            width='200px' src={`http://localhost:3001/uploads/${property.image}`}
                                            alt="profile" />
                                    </th>
                                    <td>{property.title}</td>
                                    <td>{property.price}</td>
                                    <td>{property.category}</td>
                                    <td>{property.purpose}</td>
                                    <td>
                                        <Link to={`/editProperty/${property._id}`}>
                                            <button type="button" class="btn btn-primary" >Edit</button>
                                        </Link>
                                    </td>
                                    <td><button type="button" class="btn btn-danger" onClick={() => this.deleteProperty(property._id)}>Delete</button></td>
                                    <td><button type="button" class="btn btn-success">Detail</button></td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                <div className="modal-dialog modal-lg">
                    {
                        (this.state.isActive) ? (
                            <Modal isOpen={this.state.isActive} >
                                <ModalHeader >
                                    <span>Update Form</span>
                                </ModalHeader>
                                <ModalBody>
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
                                            <Input type='text' name='title' id='title'
                                                //value={this.state.property.title}
                                                onChange={(e) => this.handleChange(e)} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <label for="propertyAddress">Address</label>
                                            <Input type='text'
                                                name='address'
                                                id='address'
                                                // value={this.state.property.address}
                                                onChange={(e) => this.handleChange(e)} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <label for="propertyDescription">Description</label>
                                            <textarea name="description"
                                                rows="5" class="form-control"
                                                id="description"
                                                name='description'
                                                aria-describedby="description"
                                                placeholder="Provide detail about the Property"
                                                //value={this.state.property.description}
                                                onChange={(e) => this.handleChange(e)}
                                                required>
                                            </textarea>
                                        </FormGroup>
                                        <FormGroup>
                                            <label for="propertyPrice">Price</label>
                                            <Input type='number'
                                                name='price'
                                                id='price'
                                                //value={this.state.property.price}
                                                onChange={(e) => this.handleChange(e)} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <label for="category">Category</label>
                                            <Input type="select"
                                                name="category"
                                                id="category"
                                                //value={this.state.property.category}
                                                onChange={(e) => this.handleChange(e)}>
                                                <option>Select category of your property</option>
                                                <option>Appartment</option>
                                                <option>Residental</option>

                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label for="purpose">Purpose</label>
                                            <Input type="select"
                                                name="purpose"
                                                id="purpose"
                                                // value={this.state.property.purpose}
                                                onChange={(e) => this.handleChange(e)}>
                                                <option>Select purpose of your property</option>
                                                <option>For Sell</option>
                                                <option>For Rent</option>

                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <label for="facility">First facility</label>
                                            <Input type='text'
                                                name='facility1'
                                                id='facility1'
                                                //value={this.state.property.facility1}
                                                onChange={(e) => this.handleChange(e)} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <label for="facility">Second facility</label>
                                            <Input type='text'
                                                name='facility2'
                                                id='facility2'
                                                //value={this.state.property.facility2}
                                                onChange={(e) => this.handleChange(e)} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <label for="facility">Third facility</label>
                                            <Input type='text'
                                                name='facility3'
                                                id='facility3'
                                                //value={this.state.property.facility3}
                                                onChange={(e) => this.handleChange(e)} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <label for="facility">Fourth facility</label>
                                            <Input type='text'
                                                name='facility4'
                                                id='facility4'
                                                //value={this.state.property.facility4}
                                                onChange={(e) => this.handleChange(e)} required />
                                        </FormGroup>


                                        <label for="propertyRoom">Rooms Of Property</label>
                                        <FormGroup>
                                            <label for="Rooms">Bed Room</label>
                                            <Input type='number'
                                                name='bedroom'
                                                id='bedroom'
                                                //value={this.state.property.bedroom}
                                                onChange={(e) => this.handleChange(e)} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <label for="Rooms">Living Room</label>
                                            <Input type='number'
                                                name='livingroom'
                                                id='livingroom'
                                                //value={this.state.property.livingroom}
                                                onChange={(e) => this.handleChange(e)} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <label for="Rooms">kitchen Room</label>
                                            <Input type='number'
                                                name='kitchen'
                                                id='kitchen'
                                                //value={this.state.property.kitchen}
                                                onChange={(e) => this.handleChange(e)} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <label for="Rooms">Bath Room</label>
                                            <Input type='number'
                                                name='bathroom'
                                                id='bathroom'
                                                // value={this.state.property.bathroom}
                                                onChange={(e) => this.handleChange(e)} required />
                                        </FormGroup>
                                    </Form>
                                    <Button type="button" className="btn btn-primary"> Update </Button>
                                </ModalBody>
                            </Modal>)
                            : null
                    }
                </div>


            </div>

        )
    }
}
