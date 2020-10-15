import React, { Component } from 'react'
import logo from "../images/logo.png";

export default class SideNav extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <div class="sidenav">
                    <span>
                        <img src={logo} clasName="logo" alt="Mero Ghar" width="250px" className='p-4'>
                        </img>
                    </span>

                    <a href="/editProfile">Edit Profile</a>
                    <a href="/addProperty">Add Property</a>
                    <a href="/myPropertyList">View Property</a>
                    <a href="/Logout" onClick={this.handleLogout}>Logout</a>
                </div>
            </div>
        )
    }
}
