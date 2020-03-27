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

        <div className="container-fluid main-detail">
          <div className="row detatil-row">
            <div className="col-lg-8">
              <h3 className="title">Item's Title and Images</h3>
              <h5 className="detail-price">$100.00</h5>
              
              {/* Image container */}
              <div className="img-container">
                <div className=" img-outer-element">
                  <div className="img-inner-element">
                    <img src={phone2} alt="..." className="rounded item-img" />
                  </div>
                </div>
              </div>
        
              <div className="detail-description">
                <h4>Description</h4>
                <p>Bacon ipsum dolor amet alcatra capicola ground round, short ribs swine tenderloin sirloin pork loin buffalo jerky biltong landjaeger shoulder flank. Short loin cupim biltong pork, salami chislic chicken frankfurter capicola strip steak. Pig sausage short loin doner, pork loin ribeye tri-tip landjaeger turducken buffalo. Sirloin andouille corned beef, pancetta sausage landjaeger ham. Biltong frankfurter pig bresaola ham hock hamburger. Ham hock boudin rump jowl, bresaola brisket chuck tail pancetta doner. Turkey leberkas corned beef cow pork loin chicken.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <h4>Something info comes here...</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;