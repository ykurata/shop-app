import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/Navbar";

const Avatar = () => {
  const [image, setImage] = useState(null);
  const [sendImage, setSendImage] = useState(null);
  const [token] = useState(localStorage.getItem("jwtToken"));
  const [userId] = useState(localStorage.getItem("userId"));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const imageChange = e => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setSendImage( e.target.files[0]);
  }

  useEffect(() => {
    axios.get(`/user/get/${userId}`)
    .then(res => {
      setImage(res.data.image);
    })
    .catch(err => {
      console.log(err);
    });
  }, [userId]);

  const submitAvatar = e => {
    e.preventDefault();

    if (sendImage === null) {
      setError("Please select an image");
    }
    
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image", sendImage);

    axios.post("/user/image", formData, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        setIsLoading(false);
        console.log(res.data);
        toast("Successfully Submitted!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="main-avatar">
      <Navbar></Navbar>

      <div className="container">
        <div className="row">
          <div className="col">
          </div>
          <div className="col-lg-6 col-md-12">
            <form onSubmit={submitAvatar}> 
              <div style={{ height: "70px"}}></div>
              <div className="outer-avatar text-center">
                {image ? ( 
                  <img className="rounded-circle preview-avatar" src={image} alt="avatar"></img>      
                ) : (
                  <span className="fa-span">
                    <i className="fas fa-user-circle fa-10x preview-avatar"></i>
                  </span> 
                )}
                
                {error? (
                  <p className="error text-center">{error}</p>
                ) : (
                  null
                )}

                <div className="mt-3">
                  <label className="btn btn-outline-info">
                    Select Image
                    <input
                      type="file"
                      name="image"
                      hidden
                      onChange={imageChange}
                    />
                  </label>
                </div>
                <div className="mt-3">
                  {isLoading === false ? (
                    <button className="btn btn-primary" type="submit" style={{ width: "200px"}}>Submit</button>
                  ) : (
                    <button className="btn btn-primary" type="button" disabled style={{ width: "200px"}}>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </button>
                  )}
                </div>
                <ToastContainer autoClose={2000} />
              </div>
            </form> 
          </div>
          <div className="col">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Avatar;