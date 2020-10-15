import React, { Component } from 'react'
import axios from 'axios'
import { Button, Container } from 'reactstrap'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

import Footer from './footer';
import Banner from './Banner';

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            config: {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            }
        }
    }


    componentDidMount() {

        axios.get('http://localhost:3001/users/myProfile', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    user: response.data
                })
            })
            .catch((err) => console.log(err.response));

    }


    handleChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/login')
    }

    render() {
        return (
            <div id='root'>
                <Navbar />
                {/* <h2>Welcome, {this.state.user.email}</h2>
                <Button color='link' onClick={this.handleLogout}>LOGOUT</Button>
                <Link to='/editProfile'>Edit Profile</Link>
                <Button><Link to='/addProperty'>addProperty</Link></Button>
                <Button><Link to='/myPropertyList'>viewProperty</Link></Button>
                <Link to='/editProperty'>Edit Property</Link> */}
                <Banner></Banner>
                <Footer />
            </div>


        )
    }
}
