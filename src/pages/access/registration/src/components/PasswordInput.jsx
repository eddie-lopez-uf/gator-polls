import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const validatePassword = (inputEvent, inputSetter, errorSetter) => {
    // get password from input
    const password = inputEvent;

    // define password standards through regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    // sets password value
    inputSetter(password);

    // validates password
    if (!passwordRegex.test(password)) {
        errorSetter(
            "Password must contain at least 8 characters, 1 uppercase, 1 lowercase and 1 number"
        );
    } else {
        errorSetter(undefined);
    }
};

export default function PasswordInput({
    setPassword,
    setPasswordError,
    passwordError,
}) {
    return (
        <TextField
            onChange={(e) =>
                validatePassword(e.target.value, setPassword, setPasswordError)
            }
            label="Password"
            name="saved-password"
            type="password"
            error={!!passwordError}
            helperText={passwordError}
        />
    );
}

PasswordInput.propTypes = {
    setPassword: PropTypes.func.isRequired,
    setPasswordError: PropTypes.func.isRequired,
    passwordError: PropTypes.string,
};
