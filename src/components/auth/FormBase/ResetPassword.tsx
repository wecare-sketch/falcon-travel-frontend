import React from "react";
import PasswordInputWithToggle from "./PasswordInputWithToggle";

interface Props {
  password: string;
  confirmPassword: string;
  setPassword: (val: string) => void;
  setConfirmPassword: (val: string) => void;
}

const ResetPassword = ({
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}: Props) => {
  return (
    <div className="mt-3 md:mt-4">
      <div className="mb-2.5">
        <PasswordInputWithToggle
          label="New Password"
          placeholder="Enter password"
          value={password}
          onChange={setPassword}
        />
      </div>
      <div className="mb-4 md:mb-6">
        <PasswordInputWithToggle
          label="Confirm Password"
          placeholder="Enter password again"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
