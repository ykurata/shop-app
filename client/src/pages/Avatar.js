import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "../components/Navbar";
import { UserContext } from '../contexts/UserContext';

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const Avatar = (props) => {
  const { postAvatar, loading } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [sendImage, setSendImage] = useState(null);
  const [userId] = useState(localStorage.getItem("userId"));
  const [error, setError] = useState('');

  const [show, setShow] = useState(props.show);

  const handleClose = () => setShow(false);

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
    <div>
      <Modal show={props.show} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Avatar;