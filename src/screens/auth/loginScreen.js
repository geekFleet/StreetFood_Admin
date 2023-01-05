import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AuthUser from "../../components/authUser";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { http, setToken } = AuthUser();
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = () => {
    setIsLoading(true);
    http
      .post("/auth/login", { username: number, password: password })
      .then((res) => {
        setToken(res.data.user_info, res.data.access_token);
      })
      .catch((error) => {
        toast.error((error.response.data.detail),{
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <ToastContainer />
      <Container id="main-container" className="d-grid h-100">
        <Form id="sign-in-form" className="text-center p-3 w-100">
          <img
            className="mb-3 bootstrap-logo"
            src="https://streetfood.blob.core.windows.net/asset/logo.png"
            alt="Bootstrap 5"
          />
          <h1 className="mb-3 fs-3 fw-normal">Please sign in</h1>
          <Form.Group className="mb-3" controlId="sign-in-email-address">
            <Form.Control
              type="text"
              size="lg"
              placeholder="Moblie Number"
              onChange={(e) => setNumber(e.target.value)}
              className="position-relative"
              autoComplete="username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="sign-in-password">
            <Form.Control
              type="password"
              size="lg"
              placeholder="Password"
              autoComplete="current-password"
              className="position-relative"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid">
            <Button
              size="lg"
              variant="primary"
              type="button"
              onClick={submitForm}
              disabled={isLoading}
            >
              {isLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </div>
          <p className="mt-5 text-muted">&copy; 2023-2024</p>
        </Form>
      </Container>
    </div>
  );
}
export default Login;
