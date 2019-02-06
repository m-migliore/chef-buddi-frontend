import React, { Component } from 'react';

class AddRecipeContainer extends Component {
  state = {
    name: "",
    category: "",
    area: "",
    instructions: "",
    image: "",
    youtube: "",
    tags: "",
    source: ""
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className="container add-recipe-form">
        <div className="row">
          <div className="col">
            <h2>Add Recipe</h2>
          </div>
        </div>
        
        <div className="row">
          <div className="col">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="name-input">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={this.state.name}
                      placeholder="Enter name"
                      onChange={this.handleChange}
                      id="name-input"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category-input">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={this.state.category}
                      placeholder="Enter Category"
                      onChange={this.handleChange}
                      id="category-input"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="area-input">Area</label>
                    <input
                      type="text"
                      name="area"
                      value={this.state.area}
                      placeholder="Enter Area"
                      onChange={this.handleChange}
                      id="area-input"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="instructions-input">Instructions</label>
                    <textarea
                      type="text"
                      name="instructions"
                      value={this.state.instructions}
                      placeholder="Enter Instructions"
                      onChange={this.handleChange}
                      id="instructions-input"
                      className="form-control"
                      rows="5"
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="image-input">Image</label>
                    <input
                      type="text"
                      name="image"
                      value={this.state.image}
                      placeholder="Enter Image URL"
                      onChange={this.handleChange}
                      id="image-input"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="youtube-input">Video</label>
                    <input
                      type="text"
                      name="youtube"
                      value={this.state.username}
                      placeholder="Enter Video URL"
                      onChange={this.handleChange}
                      id="youtube-input"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="tags-input">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={this.state.username}
                      placeholder="Enter Tags"
                      onChange={this.handleChange}
                      id="tags-input"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="source-input">Source</label>
                    <input
                      type="text"
                      name="source"
                      value={this.state.username}
                      placeholder="Enter Source URl"
                      onChange={this.handleChange}
                      id="source-input"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default AddRecipeContainer;
