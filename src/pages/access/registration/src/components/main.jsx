import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Form from "./Form";

export default function RegistrationPage() {
    return (
        <form>
            <h2>Register</h2>
            <p>
                Already have an account? Login{" "}
                <Link to="/access/login">here</Link>.
            </p>
            <Form />
            <Button variant="contained">Create Account</Button>
        </form>
    );
}
