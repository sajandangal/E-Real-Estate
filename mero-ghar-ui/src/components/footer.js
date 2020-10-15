import React, { Component } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";


export default class footer extends Component {
    render() {
        return (
            <MDBFooter id="footermain" className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                        <MDBCol className="title" md="6">
                            <h5 >About Us</h5>
                            <p>
                                MeroGhar is the web application that is developed with the purpose of simplifying and providing a
                                 platform to search houses/properties for buying, selling or renting services. It is an online
                                 marketing platform where the buyer/tenant and seller/owner can communicate each other directly
                                 without a middleman about their properties. Hence, MeroGhar operates as a bridge between the buyer and the seller.
                            </p>
                        </MDBCol>
                        <MDBCol id="myLink" md="6">
                            <ul>
                                <li className="list-unstyled">
                                    <i className="fa fa-car"></i>
                                    <a href="#!">Facebook</a>
                                </li>
                                <li className="list-unstyled">
                                    <a href="#!">Instagram</a>
                                </li>
                                <li className="list-unstyled">
                                    <a href="#!">Twitter</a>
                                </li>
                                <li className="list-unstyled">
                                    <a href="#!">Youtube</a>
                                </li>
                            </ul>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div id="projectLink" className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright: <a href="#"> MeroGhar.com </a>
                    </MDBContainer>
                </div>
            </MDBFooter >
        )
    }
}
