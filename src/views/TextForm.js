import React from 'react';

class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row justify-content-center mb-3">
          <div className="col-auto">
            <input 
              type="text"
              className="p-1 form-control"
              placeholder="Name of crypto..." 
              value={this.state.value} 
              onChange={this.handleChange} 
            />
          </div>
          <div className="col-auto">
            <input 
              className="p-1 btn btn-primary"
              type="submit" 
              value="Submit" 
            />
          </div>
        </div>
      </form>
    );
  }
}

export default TextForm;