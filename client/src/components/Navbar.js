import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <button className="btn btn-info my-2 my-sm-0" type="submit">Post Item</button>
                </li>  
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Categories
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="/">Action</a>
                    <a className="dropdown-item" href="/">Another action</a>
                    <a className="dropdown-item" href="/">Something else here</a>
                  </div>
                </li>

                {/* Search form  */}
                <form className="form-inline">
                  <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
                  <div className="input-group-append">
                    <button className="btn btn-secondary" type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>

                <li className="nav-item">
                  <a className="nav-link" href="/">Log In</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">Sign Up</a>
                </li>
              </ul>
              
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar;