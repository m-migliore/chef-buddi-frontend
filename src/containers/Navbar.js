import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Navbar extends Component {

  render() {
    return (
      <div className={this.props.currentUserId ? "navbox rainbow-border" : "navbox rainbow-border floating"}>
        <div className="container">
          <div className="row">
            <div className="col">
              <nav className="navbar">
                <h1>Chef <span>Buddi</span></h1>

                {this.props.currentUserId ? <>
                  <Link to="/profile">Profile</Link>
                  <Link to="/manage-ingredients">Manage Ingredients</Link>
                  <Link to="/find-recipes">Find Recipes</Link>
                  <Link to="/add-recipe">Add Recipe</Link>
                </>
                :
                null
              }
              </nav>
            </div>
          </div>
        </div>
      </div>

    );
  }

}

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId
  }
}

export default connect(mapStateToProps)(Navbar)
