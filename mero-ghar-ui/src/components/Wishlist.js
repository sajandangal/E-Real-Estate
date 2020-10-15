import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import PrivateNav from './PrivateNav';
import Footer from './footer';
export default class Wishlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: [],
            wishlist: [],
            config: {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            },
            wishlistId: ''
        }
    }
    componentDidMount() {
        Axios.get('http://localhost:3001/wishlist', this.state.config)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    wishlist: response.data
                })
            })
            .catch((err) => console.log(err.response));
    }

    removeWishlist = (wishlistId) => {
        Axios.delete(`http://localhost:3001/wishlist/${wishlistId}`, this.state.config)
            .then((response) => {
                const filteredWishlist = this.state.wishlist.filter((wishlist) => {
                    return wishlist._id !== wishlistId
                })
                this.setState({
                    visible1: true,
                    wishlist: filteredWishlist
                })
            }).catch((err) => console.log(err.response));
    }


    render() {
        return (
            <div>
                <PrivateNav></PrivateNav>
                <h2 className="mb-3 mt-3 text-muted text-center">My Wishlist</h2>

                <div className="AllPropTable">
                    <table className="table">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Title</th>
                                <th scope="col">Price</th>
                                <th scope="col">Category</th>
                                <th scope="col">Purpose</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.wishlist.map(wishlist => {
                                    return (<tr key={wishlist._id}>
                                        <th scope="row">
                                            <img className='img-thumbnail '
                                                width='200px' src={`http://localhost:3001/uploads/${wishlist.properties.image}`}
                                                alt="profile" />
                                        </th>
                                        <td>{wishlist.properties.title}</td>
                                        <td>{wishlist.properties.price}</td>
                                        <td>{wishlist.properties.category}</td>
                                        <td>{wishlist.properties.purpose}</td>
                                        <td>
                                            <Link to={`/propertyDetail/${wishlist.properties._id}`}>
                                                <button type="button" class="btn btn-primary" >Details</button>
                                            </Link>
                                        </td>
                                        <td><button type="button" class="btn btn-danger" onClick={() => this.removeWishlist(wishlist._id)}>Remove</button></td>
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
