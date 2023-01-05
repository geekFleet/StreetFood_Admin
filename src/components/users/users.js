import React, { useState, useEffect, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuthUser from "../authUser";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users() {
  const { http } = AuthUser();
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = (user_id) => {
    handleShow();
    http
      .get(`/Admin/User/${user_id}`)
      .then((result) => {
        console.log(result.data);
        // setEditName(result.data.fullname)
        // setEditEmail(result.data.email)
        // setEditState(result.data.state)
        // setEditCIty(result.data.city)
        // setEditstatus(result.data.status)
        // setEditID(user_id)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const [editID, setEditID] = useState();
  const [editName, setEditName] = useState();
  const [editEmail, setEditEmail] = useState();
  const [editState, setEditState] = useState();
  const [editCity, setEditCIty] = useState();
  const [editstatus, setEditstatus] = useState();

  const handleDelete = (e, user_id) => {
    e.preventDefault();
    if (window.confirm("Are You sure to delete this User") === true) {
      const id = toast.loading("Please wait...");
      http
        .delete(`/Admin/User/${user_id}`)
        .then((result) => {
          debugger;
          if (result.status === 200) {
            getData();
            // clear();
            toast.update(id, {
              render: "User has been removed",
              type: "success",
              isLoading: false,
              autoClose: 2000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.update(id, {
            render: "Something went wrong",
            type: "error",
            isLoading: false,
          });
        });
    }
  };

  const handelUpdate = () => {};
  const handelEditstatus = (e) => {
    if (e.target.checked) setEditstatus(true);
    else setEditstatus(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    http
      .get(`/Admin/User/`)
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
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>City</th>
            <th>State</th>
            <th>Verify Status</th>
            <th>Active</th>
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
                  <td>{item.fullname}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.email}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                  <td
                    style={
                      item.verify === true
                        ? { backgroundColor: "#89B291" }
                        : { backgroundColor: "#D29393" }
                    }
                  >
                    {item.verify === true ? "Verified" : "Not Verified"}
                  </td>
                  <td
                    style={
                      item.status === true
                        ? { backgroundColor: "#89B291" }
                        : { backgroundColor: "#D29393" }
                    }
                  >
                    {item.status === true ? "Active" : "Not Active"}
                  </td>
                  <td>{item.created_on}</td>
                  <td>{item.last_updated_on}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(item.user_id)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={(e) => handleDelete(e, item.user_id)}
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
            <Col>Full Name</Col>
            <Col md={8}>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => setEditName(e.target.value)}
                value={editName}
              />
            </Col>
          </Row>
          <Row>
            <Col>Email</Col>
            <Col md={8}>
              <input
                type="text"
                name="email"
                className="form-control"
                onChange={(e) => setEditEmail(e.target.value)}
                value={editEmail}
              />
            </Col>
          </Row>
          <Row>
            <Col>State</Col>
            <Col md={8}>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => setEditState(e.target.value)}
                value={editState}
              />
            </Col>
          </Row>
          <Row>
            <Col>City</Col>
            <Col md={8}>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => setEditCIty(e.target.value)}
                value={editCity}
              />
            </Col>
          </Row>
          <Row>
            <Col>Active Status</Col>
            <Col md={8}>
              <input
                type="checkbox"
                id="status"
                checked={editstatus === true ? true : false}
                onChange={(e) => handelEditstatus(e)}
                value={editstatus}
              />
              <br></br>
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

export default Users;
