import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/Navbar";

const Photo = (props) => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [sendFile1, setSendFile1] = useState(null);
  const [sendFile2, setSendFile2] = useState(null);
  const [sendFile3, setSendFile3] = useState(null);
  const [sendFile4, setSendFile4] = useState(null);
  const [token] = useState(localStorage.getItem("jwtToken"));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const imageChange1 = e => {
    setFile1(URL.createObjectURL(e.target.files[0]));
    setSendFile1(e.target.files[0]);
  }

  const imageChange2 = e => {
    setFile2(URL.createObjectURL(e.target.files[0]));
    setSendFile2(e.target.files[0]);
  }

  const imageChange3 = e => {
    setFile3(URL.createObjectURL(e.target.files[0]));
    setSendFile3(e.target.files[0]);
  }

  const imageChange4 = e => {
    setFile4(URL.createObjectURL(e.target.files[0]));
    setSendFile4(e.target.files[0]);
  }
  
  const clearImage1 = e => {
    setFile1(null);
  }

  const clearImage2 = e => {
    setFile2(null);
  }

  const clearImage3 = e => {
    setFile3(null);
  }

  const clearImage4 = e => {
    setFile4(null);
  }

  useEffect(() => {
    axios.get(`/item/get/${props.match.params.id}`)
      .then(res => {
        setFile1(res.data.image[0]);
        setFile2(res.data.image[1]);
        setFile3(res.data.image[2]);
        setFile4(res.data.image[3]);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id])
 
  const onSubmit = e => {
    e.preventDefault();

    if (sendFile1 === null && sendFile2 === null && sendFile3 === null && sendFile4 === null) {
      setError("No images selected!");
    } else {
      setIsLoading(true);
    
      const formData = new FormData();
      formData.append("image", sendFile1);
      formData.append("image", sendFile2);
      formData.append("image", sendFile3);
      formData.append("image", sendFile4);

      axios.post(`/image/${props.match.params.id}`, formData, { headers: { Authorization: `Bearer ${token}`}})
        .then(res => {
          console.log(res.data);
          setIsLoading(false);
          toast("Successfully Submitted!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        })
        .catch(err => {
          console.log(err);
        });
      }
  }

  const link = <a href={`/detail/${props.match.params.id}`}>Back to Detail Page</a>

  return (
    <div>
      <Navbar></Navbar>

      <div className="container main-photo">
        <form onSubmit={onSubmit} className="text-center">
          <div className="text-center title">
            <h4>Add photos to your add</h4>
            {error ? (
              <p className="photo-error">{error}</p>
            ) : (
              null
            )}
          </div>
          <div className="row photo-row"> 
            <div className="col-lg-3 col-md-6 upload-img-container text-center">
              {file1  ? (
                <span>
                  <div className="upload-img-outer-element">
                    <div className="upload-img-inner-element">
                      <img src={file1} alt="..." className="rounded upload-img" />
                    </div>
                    <label className="btn btn-info mt-3 mr-2">
                      Select Image
                      <input
                        type="file"
                        name="file1"
                        onChange={imageChange1}
                        hidden
                      />
                    </label>
                    <label className="btn btn-secondary btn-sm mt-3" onClick={clearImage1}>
                      <i className="fas fa-times fa-2x"></i>
                    </label>
                  </div>
                </span>
              ) : (
                <span>
                  <div className="upload-img-outer-element">
                    <div className="upload-img-inner-element">
                      <div className="upload-img-no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                      <label className="btn btn-info mt-3 mr-2">
                        Select Image
                        <input
                          type="file"
                          name="file1"
                          onChange={imageChange1}
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                </span>
              )}
            </div>

            <div className="col-lg-3 col-md-6 upload-img-container text-center">
              {file2 ? (
                <span>
                  <div className="upload-img-outer-element">
                    <div className="upload-img-inner-element">
                      <img src={file2} alt="..." className="rounded upload-img" />
                    </div>
                    <label className="btn btn-info mt-3 mr-2">
                      Select Image
                      <input
                        type="file"
                        name="file1"
                        onChange={imageChange2}
                        hidden
                      />
                    </label>
                    <label className="btn btn-secondary btn-sm mt-3" onClick={clearImage2}>
                      <i className="fas fa-times fa-2x"></i>
                    </label>
                  </div>
                </span>
              ) : (
                <span>
                  <div className="upload-img-outer-element">
                    <div className="upload-img-inner-element">
                      <div className="upload-img-no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                      <label className="btn btn-info mt-4">
                        Select Image
                        <input
                          type="file"
                          name="file2"
                          onChange={imageChange2}
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                </span>
              )}
            </div>

            <div className="col-lg-3 col-md-6 upload-img-container text-center">
              {file3 ? (
                <span>
                  <div className="upload-img-outer-element">
                    <div className="upload-img-inner-element">
                      <img src={file3} alt="..." className="rounded upload-img" />
                    </div>
                    <label className="btn btn-info mt-3 mr-2">
                      Select Image
                      <input
                        type="file"
                        name="file1"
                        onChange={imageChange3}
                        hidden
                      />
                    </label>
                    <label className="btn btn-secondary btn-sm mt-3" onClick={clearImage3}>
                      <i className="fas fa-times fa-2x"></i>
                    </label>
                  </div>
                </span>
              ) : (
                <span>
                  <div className="upload-img-outer-element">
                    <div className="upload-img-inner-element">
                      <div className="upload-img-no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                      <label className="btn btn-info mt-4">
                        Select Image
                        <input
                          type="file"
                          name="file3"
                          onChange={imageChange3}
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                </span>
              )}
            </div>

            <div className="col-lg-3 col-md-6 upload-img-container text-center">
              {file4 ? (
                  <span>
                    <div className="upload-img-outer-element">
                      <div className="upload-img-inner-element">
                        <img src={file4} alt="..." className="rounded upload-img" />
                      </div>
                      <label className="btn btn-info mt-3 mr-2">
                        Select Image
                        <input
                          type="file"
                          name="file1"
                          onChange={imageChange4}
                          hidden
                        />
                      </label>
                      <label className="btn btn-secondary btn-sm mt-3" onClick={clearImage4}>
                        <i className="fas fa-times fa-2x"></i>
                      </label>
                    </div>
                  </span>
                ) : (
                  <span>
                    <div className="upload-img-outer-element">
                      <div className="upload-img-inner-element">
                        <div className="upload-img-no-image text-center"><i className="fas fa-image fa-5x"></i></div>
                        <label className="btn btn-info mt-4">
                          Select Image
                          <input
                            type="file"
                            name="file4"
                            onChange={imageChange4}
                            hidden
                          />
                        </label>
                      </div>
                    </div>
                  </span>
                )}
            </div>
            
            <ToastContainer autoClose={2000} />
            {isLoading === false ? (
              <button style={{ marginTop: "2rem", marginBottom: "2rem" }} type="Submit" className="btn btn-primary btn-lg btn-block">Submit</button>
            ) : (
              <button className="btn btn-primary btn-lg btn-block" type="button" disabled style={{ marginTop: "2rem", marginBottom: "2rem" }}>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
              </button>
            )}
            {link}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Photo;