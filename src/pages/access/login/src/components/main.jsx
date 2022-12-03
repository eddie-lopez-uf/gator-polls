import React from "react";
import { TextField, Button } from "@mui/material";
import { Form, Link, useActionData } from "react-router-dom";
import ErrorBanner from "../../../src/components/ErrorBanner";

export default function LoginPage() {
    const actionData = useActionData();

    return (
        <Form method="post">
            <h2>Login</h2>
            <ErrorBanner actionData={actionData} />
            <p>
                Don&apos;t have an account? Register{" "}
                <Link to="/access/register">here</Link>.
            </p>
            <TextField label="Email" name="saved-email" />
            <TextField label="Password" name="saved-password" type="password" />
            <Button variant="contained" name="password" type="submit">
                Login
            </Button>
        </Form>
    );
}
