import React from 'react';

const Loader = props => {
  return(
    <div className="loader">
      <img src={require('../img/cooking.svg')} alt="Chef" className="loader animated infinite pulse"/>
    </div>
  )
}

export default Loader
