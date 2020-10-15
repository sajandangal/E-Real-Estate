import React from "react";
import "./App.css";
import { Container, Navbar } from 'reactstrap';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";

import { HashRouter as Router, BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import NoMatch from './components/NoMatch';
import PrivateRoute from './components/PrivateRoute';

import AddProperty from './components/AddProperty';
import Dashboard from './components/Dashboard';
import EditProfile from './components/EditProfile';
import SideNav from './components/SideNav';
import myPropertyList from './components/PropertyList/MyPropertyList';
import PropertyViewcard from './components/PropertyViewCard';
import EditProperty from './components/EditProperty';

import Footer from './components/footer';
import Wishlist from './components/Wishlist';
import propertyDetail from './components/PropertyDetail'
import PropertyView from "./components/PropertyView";

function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={SignInForm} />
        <Route path='/login' component={SignInForm} />
        <Route path='/signup' component={SignUpForm} />
        <PrivateRoute path='/addProperty' component={AddProperty} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
        <PrivateRoute path='/editProfile' component={EditProfile} />
        <PrivateRoute path='/sideNav' component={SideNav} />
        <PrivateRoute path='/myPropertyList' component={myPropertyList} />
        <PrivateRoute path='/propertyDetail/:id' component={propertyDetail} />
        <PrivateRoute path='/properties' component={PropertyViewcard} />
        <PrivateRoute path='/editProperty/:id' component={EditProperty} />
        <Route path='/footer' component={Footer} />
        <Route exact path='/wishlist' component={Wishlist} />

        <Route exact path='/propertyview' component={PropertyView} />

        {/* <Route path='/home' component={Home} /> */}
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
