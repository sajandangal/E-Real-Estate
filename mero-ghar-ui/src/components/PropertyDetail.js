import React, { Component } from 'react'
import Axios from 'axios'
import { Container, Alert, Form, FormGroup, Input, Button, CustomInput, FormText } from 'reactstrap';

export default class PropertyDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visible1: false,
            property: [],
            user: {},
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            }
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/properties/' + (this.props.match.params.id), this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    property: response.data
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
                <FormGroup>
                    <img className='img-thumbnail'
                        width='400' src={`http://localhost:3001/uploads/${this.state.property.image}`}
                        alt="Property Image" />
                </FormGroup>
                <h4>{this.state.property.title}</h4>
                <h4>{this.state.property.address}</h4>
                <h4>{this.state.property.bathroom}</h4>
                <h4>{this.state.property.bedroom}</h4>
                <h4>{this.state.property.category}</h4>
                <h4>{this.state.property.description}</h4>
                <h4>{this.state.property.facility1}</h4>
                <h4>{this.state.property.facility2}</h4>
                <h4>{this.state.property.facility3}</h4>
                <h4>{this.state.property.facility4}</h4>
                <h4>{this.state.property.kitchen}</h4>
                <h4>{this.state.property.livingroom}</h4>
                {/* <h4>{this.state.property.owner.fullName}</h4> */}
                {/* <h4>{this.state.property.owner.phone}</h4>
                <h4>{this.state.property.owner.email}</h4> */}
                <Alert color="success" isOpen={this.state.visible1} toggle={this.toogle.bind(this)}>Wishlist Added Successfully. </Alert>
                <button type="button" class="btn btn-danger" onClick={() => this.addWishlist(this.state.property._id)}>Add to wishlist</button>
            </div>
        )
    }
}
