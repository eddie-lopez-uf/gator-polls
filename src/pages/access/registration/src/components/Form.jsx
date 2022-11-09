import React, { useState } from "react";
import { TextField } from "@mui/material";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import ConfirmPassword from "./ConfirmPassword";

export default function Form() {
    // input values
    const [, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // input errors
    const [emailError, setEmailError] = useState(undefined);
    const [passwordError, setPasswordError] = useState(undefined);
    const [confirmPasswordError, setConfirmPasswordError] = useState(undefined);

    return (
        <>
            <TextField label="Full Name" name="fullName" />
            <EmailInput
                emailError={emailError}
                setEmail={setEmail}
                setEmailError={setEmailError}
            />
            <PasswordInput
                passwordError={passwordError}
                setPassword={setPassword}
                setPasswordError={setPasswordError}
            />
            <ConfirmPassword
                password={password}
                confirmPasswordError={confirmPasswordError}
                setConfirmPasswordError={setConfirmPasswordError}
            />
        </>
    );
}
