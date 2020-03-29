import React, { Component } from 'react';
import phone2 from "../images/phone.jpg"

import Navbar from "./Navbar";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {
    return (
      <div>
        <Navbar></Navbar>

        <div className="container main-detail">
          <div className="row detatil-row">
            <div className="col-lg-9">
              <h3 className="title">Item's Title and Images</h3>
              <h5 className="detail-price">$100.00</h5>

              {/* Image container */}
              <div className="row">
                <div className="col-lg-8 img-containe">
                  <div className="img-outer-element">
                    <div className="img-inner-element">
                      <img src={phone2} alt="..." className="rounded item-img" />
                    </div>
                  </div>
                </div>
                {/* Side thumbnails */}
                <div className="col-lg-4">
                  <div className="thumbnail-container row">
                    <div className="thumbnail"></div>
                    <div className="thumbnail-margin-top "></div>
                    <div className="thumbnail-margin-top"></div>
                  </div>
                </div>
              </div>

              <div className="detail-description">
                <h4>Description</h4>
                <p>Bacon ipsum dolor amet alcatra capicola ground round, short ribs swine tenderloin sirloin pork loin buffalo jerky biltong landjaeger shoulder flank. Short loin cupim biltong pork, salami chislic chicken frankfurter capicola strip steak. Pig sausage short loin doner, pork loin ribeye tri-tip landjaeger turducken buffalo. Sirloin andouille corned beef, pancetta sausage landjaeger ham. Biltong frankfurter pig bresaola ham hock hamburger. Ham hock boudin rump jowl, bresaola brisket chuck tail pancetta doner. Turkey leberkas corned beef cow pork loin chicken.</p>
              </div>
            </div>
            <div className="col-lg-3">
              <h6>Posted 2020/03/28</h6>
              <div className="user-info-container">
                <div className="user-info text-center">
                  <div className="user-icon">
                    <i className="fas fa-user-circle fa-5x"></i>
                  </div>
                  <div className="user-name">
                    <h5>Yasuko Kurata</h5>
                  </div>
                  <div>
                    <p>View 5 Items</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;