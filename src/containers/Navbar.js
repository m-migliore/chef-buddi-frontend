import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar">
        <h1>Chef Buddi</h1>
        <Link to="/">Home</Link>
        {/* <Link to="/ingredients">Ingredients</Link>
        <Link to="/recipes">Recipes</Link> */}
        <Link to="/profile">Profile</Link>
        <Link to="/find-recipes">Find Recipes</Link>
      </nav>
    );
  }

}

export default Navbar
