import React, { Component } from 'react'
import Axios from 'axios'
import PrivateNav from './PrivateNav';
import Footer from './footer';
import { Container, Alert, Form, FormGroup, Input, Button, CustomInput, FormText } from 'reactstrap';
import home from "../images/home.png";
import { Link } from 'react-router-dom';

export default class PropertyViewCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
    componentDidMount() {

        Axios.get('http://localhost:3001/properties', this.state.config)
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
    addWishlist = (propertyId) => {
        Axios.post(`http://localhost:3001/wishlist/`,
            {
                properties: propertyId,
                user: this.state.user._id,
            }, this.state.config)
            .then((response) => {
                console.log(response);
                this.setState({

                    visible1: true
                })
            }).catch((err) => console.log(err.response));
    }
    render() {
        return (
            <div>
                <PrivateNav></PrivateNav>
                <Alert color="success" isOpen={this.state.visible1} toggle={this.toogle.bind(this)}>Wishlist Added Successfully. </Alert>
                <h2 className="mb-3 mt-3 text-muted text-center">Tabular List of Mero Ghar</h2>

                <div className="AllPropTable">
                    <table className="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Title</th>
                                <th scope="col">Price</th>
                                <th scope="col">Category</th>
                                <th scope="col">Purpose</th>
                                <th scope="col">Post By</th>
                                <th scope="col">Phone</th>
                                <th scope="col">More Detail</th>
                                <th scope="col">Add To wishlist</th>
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
                                        <td>{property.owner.fullName}</td>
                                        <td>{property.owner.phone}</td>
                                        <td>
                                            <Link to={`/propertyDetail/${property._id}`}>
                                                <button type="button" class="btn btn-primary" >Details</button>
                                            </Link>
                                        </td>
                                        <td><button type="button" class="btn btn-danger" onClick={() => this.addWishlist(property._id)}>Add</button></td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
