"use client";

import React from "react";
import PasswordInputWithToggle from "./PasswordInputWithToggle";

const PasswordInput = () => {
  const [password, setPassword] = React.useState("");

  return (
    <PasswordInputWithToggle
      label="Password"
      placeholder="Enter Your Password"
      value={password}
      onChange={setPassword}
    />
  );
};

export default PasswordInput;
