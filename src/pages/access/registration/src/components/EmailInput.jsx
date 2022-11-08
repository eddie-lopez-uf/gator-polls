import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const validateEmail = (inputEvent, inputSetter, errorSetter) => {
    // get email from input
    const email = inputEvent;

    // define email standards through regex
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // sets email value
    inputSetter(email);

    // validates email
    if (!emailRegex.test(email)) {
        errorSetter("Please input valid email");
    } else {
        const [, domain] = email.split("@");
        if (domain !== "ufl.edu") {
            errorSetter("Please input a valid ufl.edu email");
        } else {
            errorSetter(undefined);
        }
    }
};

export default function EmailInput({ setEmail, setEmailError, emailError }) {
    return (
        <TextField
            onChange={(e) =>
                validateEmail(e.target.value, setEmail, setEmailError)
            }
            label="Email"
            name="saved-email"
            error={!!emailError}
            helperText={emailError}
        />
    );
}

EmailInput.propTypes = {
    setEmail: PropTypes.func.isRequired,
    setEmailError: PropTypes.func.isRequired,
    emailError: PropTypes.string,
};
