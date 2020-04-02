import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import phone2 from "../images/phone.jpg"

import Navbar from "./Navbar";

class Photo extends Component {

  render() {
    return (
      <div>
        <Navbar></Navbar>
      </div>
    );
  }
}

export default Photo;