import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export const validateConfirmPassword = (inputEvent, password, errorSetter) => {
    // get confirm password from input
    const confirmPassword = inputEvent;

    // validates confirm password
    if (password !== confirmPassword) {
        errorSetter("Passwords must match");
    } else {
        errorSetter(undefined);
    }
};

export default function ConfirmPassword({
    password,
    setConfirmPasswordError,
    confirmPasswordError,
}) {
    return (
        <TextField
            onChange={(e) =>
                validateConfirmPassword(
                    e.target.value,
                    password,
                    setConfirmPasswordError
                )
            }
            label="Confirm Password"
            name="confirm-password"
            type="password"
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
        />
    );
}

ConfirmPassword.propTypes = {
    password: PropTypes.string.isRequired,
    setConfirmPasswordError: PropTypes.func.isRequired,
    confirmPasswordError: PropTypes.string,
};
