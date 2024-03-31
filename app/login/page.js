"use client";

import { Nunito_Sans } from "next/font/google";
import Login from "../../components/Login/Login";

const inter = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

import React, { useState } from "react";

const LoginPage = () => {
  return <Login></Login>;
};

export default LoginPage;
