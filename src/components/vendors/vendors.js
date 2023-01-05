import React, { useState, useEffect, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuthUser from "../authUser";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Vendors() {
  const { http } = AuthUser();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (user_id) => {
    handleShow();
    // http.get(`/Admin/User/${user_id}`)
    //   .then((result) => {
    //     console.log(result.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  // const [editID, setEditID] = useState();
  const [editVendorName, setEditVendorName] = useState();
  const [editLocation, setEditLocation] = useState();
  const [editDescription, setEditDescription] = useState();
  const [editMorningTiming, setEditMorningTiming] = useState();
  const [editEveningTiming, setEditEveningTiming] = useState();

  const handleDelete = (e, vendor_id) => {
    e.preventDefault();
    if (window.confirm("Are You sure to delete this User") === true) {
      const id = toast.loading("Please wait...");
      http.delete(`/Admin/vendor/delete/${vendor_id}`)
      .then((result) => {
        debugger
        if (result.status === 200) {
            getData();
            // clear();
            toast.update(id, { render: "User has been removed", type: "success", isLoading: false, autoClose: 2000 });                      
        }
    })
    .catch((error) => {
        console.log(error);
        toast.update(id, {render: "Something went wrong", type: "error", isLoading: false  });
    })
    }
  };

  const handelUpdate = () => {

  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    http.get(`/vendor`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
    return (
      <Fragment>
      <ToastContainer />
      <Table striped bordered hover responsive="sm">
        <thead>
          <tr>
            <th>Id</th>
            <th>Vendor name</th>
            <th>Location</th>
            <th>Status</th>
            <th>Morning timing</th>
            <th>Evening timing</th>
            <th>Description</th>
            <th>Created by</th>
            <th>Created on</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.vendor_name}</td>
                  <td>{item.location}</td>
                  <td style={item.status === true ?{backgroundColor:'#89B291'}:{backgroundColor:'#D29393'}}>{item.status === true ? "Active" : "Not Active"}</td>
                  <td>{item.morning_timing}</td>
                  <td>{item.evening_timing}</td>
                  <td>{item.description}</td>
                  <td>{item.created_by}</td>
                  <td>{item.created_on}</td>
                  <td>{item.last_updated_on}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(item.vendor_id)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={(e) => handleDelete(e, item.vendor_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify/Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
              <Col>Vendor Name</Col>
              <Col md={8}>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={(e) => setEditVendorName(e.target.value)}
                  value={editVendorName}
                />
              </Col>
            </Row>
          <Row>
            <Col>Location</Col>
            <Col md={8}>
              <input
                type="text"
                name="email"
                className="form-control"
                onChange={(e) => setEditLocation(e.target.value)}
                value={editLocation}
              />
            </Col>
          </Row>
          <Row>
            <Col>Description</Col>
            <Col md={8}>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => setEditDescription(e.target.value)}
                value={editDescription}
              />
            </Col>
          </Row>
          <Row>
            <Col>Morning timing</Col>
            <Col md={8}>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => setEditMorningTiming(e.target.value)}
                value={editMorningTiming}
              />
            </Col>
          </Row>
          <Row>
            <Col>Evening timing</Col>
            <Col md={8}>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => setEditEveningTiming(e.target.value)}
                value={editEveningTiming}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handelUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
    );
  }
  
  export default Vendors;