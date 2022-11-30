import React from "react";
import { Button } from "@mui/material";
import { Form, Link } from "react-router-dom";
import RegistrationInputs from "./Form";

export default function RegistrationPage() {
    return (
        <Form method="post">
            <h2>Register</h2>
            <p>
                Already have an account? Login{" "}
                <Link to="/access/login">here</Link>.
            </p>
            <RegistrationInputs />
            <Button variant="contained" type="submit">
                Create Account
            </Button>
        </Form>
    );
}
