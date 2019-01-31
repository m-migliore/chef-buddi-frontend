import React, { Component } from 'react';

function withSelect(WrappedComponent) {
  return class selectHOC extends Component {
    handleClick = () => {
      console.log("clicked")
    }

    render() {
      return (
        <div className="selectable" onClick={this.handleClick}>
          <WrappedComponent {...this.props} />
        </div>

      )
    }
  }
}

export default withSelect
