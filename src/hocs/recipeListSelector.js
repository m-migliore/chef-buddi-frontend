import React, { Component } from 'react';

function recipeListSelector(WrappedComponent, recipes) {
  return class recipeWrap extends Component {
    render() {
      return (
        <>
          <WrappedComponent {...this.props} recipes={recipes} />
        </>

      )
    }
  }
}

export default recipeListSelector
