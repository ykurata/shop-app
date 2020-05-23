import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/Navbar";
import { UserContext } from '../contexts/UserContext';

const Avatar = () => {
  const { postAvatar, loading } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [sendImage, setSendImage] = useState(null);
  const [userId] = useState(localStorage.getItem("userId"));
  const [error, setError] = useState('');

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

    const formData = new FormData();
    formData.append("image", sendImage);
    postAvatar(formData);
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
                  {loading === true ? (
                    <button className="btn btn-primary" type="button" disabled style={{ width: "200px"}}>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </button>
                  ) : (
                    <button className="btn btn-primary" type="submit" style={{ width: "200px"}}>Submit</button>
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