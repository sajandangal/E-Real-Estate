import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import Footer from './footer';
import PrivateNav from './PrivateNav';
import Banner from './Banner';

import user from "../images/mUser.png";
import prop from "../images/prop.png";
import logout from "../images/logout.png";
import wish from "../images/wishlist.png";

export default class Dashboard extends Component {
    handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <PrivateNav />
                <Banner></Banner>
                <div>
                    <h2 className="mb-3 mt-3 text-muted text-center"> User Dashboard </h2>

                    <Container className="dashboard_btn_container">
                        <Row>
                            <Link className="col-lg-3 col-md-4 shadow p-3 mb-5 rounded bg-success text-dark mt-3 mb-3 pt-3 pb-3 controls nounderline" to="/editProfile" style={{ width: '22rem' }}>
                                <h4 className="text-center"><img src={user} alt="sportlogo" /></h4>
                                <h4 className="text-center">Profile</h4>
                                <p className="text-center"><small>Edit my profile</small></p>
                            </Link>
                            <span className="col-lg-1 col-md-4"></span>
                            <Link className="col-lg-3 col-md-4 shadow p-3 mb-5 rounded bg-primary text-dark mt-3 mb-3 pt-3 pb-3 controls" to="/addProperty" style={{ width: '22rem' }}>
                                <h4 className="text-center"><img src={prop} alt="sportlogo" /></h4>
                                <h4 className="text-center">Property</h4>
                                <p className="text-center"><small>Add property</small></p>
                            </Link>
                            <span className="col-lg-1 col-md-4"></span>
                            <Link className="col-lg-3 col-md-4 shadow p-3 mb-5 rounded bg-warning text-dark mt-3 mb-3 pt-3 pb-3 controls" to="/myPropertyList" style={{ width: '22rem' }}>
                                <h4 className="text-center"><img src={prop} alt="sportlogo" /></h4>
                                <h4 className="text-center">Property</h4>
                                <p className="text-center"><small>View My property</small></p>
                            </Link>

                        </Row>

                        <Row >

                            <Link className="col-lg-3 col-md-4 shadow p-3 mb-5 rounded bg-info text-dark mt-3 mb-3 pt-3 pb-3 controls" to="/wishlist" style={{ width: '22rem' }}>
                                <h4 className="text-center"><img src={wish} alt="sportlogo" /></h4>
                                <h4 className="text-center">Wishlist</h4>
                                <p className="text-center"><small>View Wishlist</small></p>
                            </Link>

                            <span className="col-lg-1 col-md-4"></span>
                            <Link onClick={this.handleLogout} className="col-lg-3 col-md-4 shadow p-1 mb-5 rounded bg-danger text-dark mt-3 mb-3 pt-3 pb-3 controls" to="/" style={{ width: '22rem' }}>
                                <h4 className="text-center"><img src={logout} alt="sportlogo" /></h4>
                                <h4 className="text-center">Logout</h4>
                                <p className="text-center"><small>logout from system</small></p>
                            </Link>

                        </Row>
                    </Container>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
