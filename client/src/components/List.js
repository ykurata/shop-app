import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

import Navbar from "./Navbar";

const ListStyles = theme => ({
  avatar: {
    height: 60,
    width: 60,
    textDecoration: "none",
    [theme.breakpoints.up('md')]: {
      height: 100,
      width: 100
    },
    [theme.breakpoints.up('lg')]: {
      height: 150,
      width: 150
    },
  }
  
});

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Navbar></Navbar>
        
        <div className="container item-list">
          <div className="card">
            <div className="card-body row">
              <div className="col-lg-2 col-md-2">
                <Avatar className={classes.avatar} variant='square'></Avatar>
              </div>
              <div className="title col-lg-10 col-md-10">
                <h5>Item's Title</h5>
                <p className="date">25/03/2020</p>
                <p className="description">Bacon ipsum dolor amet kevin short loin buffalo drumstick fatback venison ground round spare ribs swine rump kielbasa shankle capicola alcatra leberkas. Bresaola alcatra short ribs, pig tail biltong tenderloin venison beef ribs capicola meatloaf chicken. Chislic ham salami filet mignon spare ribs prosciutto. Biltong drumstick turkey ham spare ribs, picanha pig meatball pancetta shankle chuck kielbasa filet mignon tri-tip landjaeger. Burgdoggen meatloaf prosciutto shank boudin chuck, ribeye pork chop. Tenderloin andouille beef buffalo sausage pork loin doner.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(ListStyles)(List);