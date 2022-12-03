import React from "react";
import { Button } from "@mui/material";
import { Form, Link, useActionData } from "react-router-dom";
import RegistrationInputs from "./Form";
import ErrorBanner from "../../../src/components/ErrorBanner";

export default function RegistrationPage() {
    const actionData = useActionData();
    return (
        <Form method="post">
            <h2>Register</h2>
            <ErrorBanner actionData={actionData} />
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
