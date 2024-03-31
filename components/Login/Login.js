"use client";
import { useState } from "react";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import styles from "./Login.module.css";

import { signIn } from "aws-amplify/auth";
import swal from "sweetalert";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_bUj33VhLp",
      userPoolClientId: "5thg7d5aus1vs7bu9elg7sa9nu",

      // loginWith: {
      //   oauth: {
      //     domain: "recipe-keeper.auth.us-east-2.amazoncognito.com",
      //     scopes: ["openid email phone profile aws.cognito.signin.user.admin "],
      //     redirectSignIn: ["http://localhost:3000/", "https://example.com/"],
      //     redirectSignOut: ["http://localhost:3000/", "https://example.com/"],
      //     responseType: "code",
      //   },
      //   username: "true",
      //   email: "false",
      //   phone: "false",
      // },
    },
  },
});

function Login() {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [isValidInputs, setIsValidInputs] = useState(true);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const handleSubmit = (event) => {
    const currentConfig = Amplify.getConfig();
    console.log("Handle Submit", currentConfig);

    try {
      event.preventDefault();
      setIsLoginButtonDisabled(true);

      signIn(userID.trim(), password.trim())
        .then((Response) => {
          // Store.set(["userID"], userID);
          // Store.set(["password"], password);
          // Store.set(["userObj"], Response);
          console.log(Response);

          let challengeName = Response && Response.challengeName;
          if (challengeName === "NEW_PASSWORD_REQUIRED") {
            // this.navigate("/changepassword");
          } else if (challengeName === "SMS_MFA") {
            // this.navigate("/mfa");
          } else if (!Response.hasOwnProperty(challengeName)) {
            // Store.set(["userLoggedIn"], true);
            // this.setTokens(Response);
            // this.UtilityClass.checkingForJWTTokenExpiry();
            // let firstTimePasswordChange = Store.get("firstTimePasswordChange");
            // if (firstTimePasswordChange) {
            //   this.postSuccessfullMFASubmit(Response);
            // } else {
            //   this.checkForPasswordExpiry();
            // }
          } else {
            // this.setState({ isLoginButtonDisabled: false });
            swal(
              "Failed",
              "Something went wrong. Please try again after sometime.",
              "error"
            );
          }
        })
        .catch((error) => {
          setIsLoginButtonDisabled(false);
          swal("Failure", `${error.message}`, "error");
        });
    } catch (e) {
      console.log("Exception In handleSubmit In Login Controller: ", e);
    }
  };

  // handle = (event) => {
  //   console.log('event Name')
  //   this.setState({
  //     [event.target.id]: event.target.value,
  //   });
  // };

  return (
    <div className={`container-fluid ${styles.LoginContainer}`}>
      <Row className={`${styles.LoginRow}`}>
        {/* <Col xs={12} sm={6} md={4} className="LoginLogoContainer">
          <Image src={logo} fluid />
        </Col> */}
      </Row>
      <Row className={`${styles.LoginRow} ${styles.LoginDetailsContainer}`}>
        <Col xs={12} sm={6} md={4} className={`${styles.LoginMainContainer}`}>
          <Form onSubmit={handleSubmit}>
            {/* <h4 className="LoginHeader">MEMBER PORTAL LOGIN</h4> */}
            <h4 className={`${styles.LoginHeader}`}>Login</h4>
            <Form.Group controlId="userID">
              <Form.Label className={`${styles.LoginLabels}`}>
                User ID
              </Form.Label>
              <Form.Control
                className={`${styles.LoginInputs}`}
                type="text"
                placeholder="User ID"
                value={userID}
                onChange={(event) => {
                  setUserID(event.target.value);
                }}
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className={`${styles.LoginLabels}`}>
                Password
              </Form.Label>
              <Form.Control
                className={`${styles.LoginInputs}`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                autoComplete="off"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className={`${styles.LoginBtn}`}
              disabled={isLoginButtonDisabled || !isValidInputs}
            >
              Login
            </Button>
            {/* <Form.Group>
              <Form.Label
                className="LoginLabels LoginForgotPassword"
                onClick={() => {
                  this.navigate("/forgotpassword");
                }}
              >
                Forgot Password?
              </Form.Label>
            </Form.Group> */}
            <Form.Group className={`${styles.LoginTAndCContainer}`}>
              <Form.Label className={`${styles.LoginTAndC}`}>
                {"By logging in I agree to the "}
              </Form.Label>
              <Form.Label className={`${styles.LoginTAndCLink}`}>
                {"Terms of Use & Privacy Policy"}
              </Form.Label>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default withAuthenticator(Login, {
  signUpAttributes: ["email", "name", "phone_number"],
});
