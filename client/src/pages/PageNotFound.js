import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from "../components/Navbar";

const PageNotFound = () => {
  return (
    <div id="pageNotFound">
      <Navbar />
      <div className="container text-center">
        <div className="col-lg-12 mt-5">
          <h2>404 Page Not Found</h2>
          <Link to="/">Home</Link>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound;
