import React, { Component } from 'react';
import phone2 from "../images/phone.jpg"

import Navbar from "./Navbar";


class List extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {
    return (
      <div>
        <Navbar></Navbar>
        
        <div className="container item-list">

          <div className="list-group">
            <div className="card list-group-item">
              <div className="card-body row">
                <div className="col-lg-2 col-md-2">
                  {/* <img src={phone2} alt="..." className="rounded list-item-img" /> */}
                  <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                </div>
                <div className="title col-lg-10 col-md-10">
                  <h5 className="item-price">$100.00</h5>
                  <h5 className="item-title">Item's Title</h5>
                  <p className="date">25/03/2020</p>
                  <p className="description">Bacon ipsum dolor amet kevin short loin buffalo drumstick fatback venison ground round spare ribs swine rump kielbasa shankle capicola alcatra leberkas. Bresaola alcatra short ribs, pig tail biltong tenderloin venison beef ribs capicola meatloaf chicken. Chislic ham salami filet mignon spare ribs prosciutto. Biltong drumstick turkey ham spare ribs, picanha pig meatball pancetta shankle chuck kielbasa filet mignon tri-tip landjaeger. Burgdoggen meatloaf prosciutto shank boudin chuck, ribeye pork chop. Tenderloin andouille beef buffalo sausage pork loin doner.</p>
                </div>
              </div>
            </div>

            <div className="card list-group-item">
              <div className="card-body row">
                <div className="col-lg-2 col-md-2">
                  {/* <img src={phone2} alt="..." className="rounded list-item-img" /> */}
                  <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                </div>
                <div className="title col-lg-10 col-md-10">
                  <h5 className="item-price">$100.00</h5>
                  <h5 className="item-title">Item's Title</h5>
                  <p className="date">25/03/2020</p>
                  <p className="description">Bacon ipsum dolor amet kevin short loin buffalo drumstick fatback venison ground round spare ribs swine rump kielbasa shankle capicola alcatra leberkas. Bresaola alcatra short ribs, pig tail biltong tenderloin venison beef ribs capicola meatloaf chicken. Chislic ham salami filet mignon spare ribs prosciutto. Biltong drumstick turkey ham spare ribs, picanha pig meatball pancetta shankle chuck kielbasa filet mignon tri-tip landjaeger. Burgdoggen meatloaf prosciutto shank boudin chuck, ribeye pork chop. Tenderloin andouille beef buffalo sausage pork loin doner.</p>
                </div>
              </div>
            </div>

            <div className="card list-group-item">
              <div className="card-body row">
                <div className="col-lg-2 col-md-2">
                  {/* <img src={phone2} alt="..." className="rounded list-item-img" /> */}
                  <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                </div>
                <div className="title col-lg-10 col-md-10">
                  <h5 className="item-price">$100.00</h5>
                  <h5 className="item-title">Item's Title</h5>
                  <p className="date">25/03/2020</p>
                  <p className="description">Bacon ipsum dolor amet kevin short loin buffalo drumstick fatback venison ground round spare ribs swine rump kielbasa shankle capicola alcatra leberkas. Bresaola alcatra short ribs, pig tail biltong tenderloin venison beef ribs capicola meatloaf chicken. Chislic ham salami filet mignon spare ribs prosciutto. Biltong drumstick turkey ham spare ribs, picanha pig meatball pancetta shankle chuck kielbasa filet mignon tri-tip landjaeger. Burgdoggen meatloaf prosciutto shank boudin chuck, ribeye pork chop. Tenderloin andouille beef buffalo sausage pork loin doner.</p>
                </div>
              </div>
            </div>

            <div className="card list-group-item">
              <div className="card-body row">
                <div className="col-lg-2 col-md-2">
                  {/* <img src={phone2} alt="..." className="rounded list-item-img" /> */}
                  <div className="no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                </div>
                <div className="title col-lg-10 col-md-10">
                  <h5 className="item-price">$100.00</h5>
                  <h5 className="item-title">Item's Title</h5>
                  <p className="date">25/03/2020</p>
                  <p className="description">Bacon ipsum dolor amet kevin short loin buffalo drumstick fatback venison ground round spare ribs swine rump kielbasa shankle capicola alcatra leberkas. Bresaola alcatra short ribs, pig tail biltong tenderloin venison beef ribs capicola meatloaf chicken. Chislic ham salami filet mignon spare ribs prosciutto. Biltong drumstick turkey ham spare ribs, picanha pig meatball pancetta shankle chuck kielbasa filet mignon tri-tip landjaeger. Burgdoggen meatloaf prosciutto shank boudin chuck, ribeye pork chop. Tenderloin andouille beef buffalo sausage pork loin doner.</p>
                </div>
              </div>
            </div>
            

          </div>
        </div>

      </div>
    );
  }
}

export default List;