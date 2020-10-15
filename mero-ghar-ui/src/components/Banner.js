import React, { Component } from 'react'
import home from "../images/home.png";
import { Container } from 'reactstrap';

export default class Banner extends Component {
    render() {
        return (
            <div>
                <Container>
                    <h2 className="mb-3 mt-3 text-muted text-center">Mero Ghar</h2>
                    <img src={home} style={{ width: "100%" }} />
                </Container>
            </div>
        )
    }
}
