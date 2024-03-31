"use client";
import React, { useState } from "react";

import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_bUj33VhLp",
      userPoolClientId: "5thg7d5aus1vs7bu9elg7sa9nu",
    },
  },
});

const Dashboard = () => {
  return (
    <div>
      <p>Dashboard Page</p>
    </div>
  );
};

export default withAuthenticator(Dashboard, {
  signUpAttributes: ["email", "name", "phone_number"],
});
