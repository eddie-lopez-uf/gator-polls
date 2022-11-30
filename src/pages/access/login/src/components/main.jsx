import React from "react";
import { TextField, Button } from "@mui/material";
import { Form, Link, useActionData } from "react-router-dom";

export default function LoginPage() {
    const actionData = useActionData();
    console.log(actionData);

    return (
        <Form method="post">
            <h2>Login</h2>
            <p>
                Don&apos;t have an account? Register{" "}
                <Link to="/access/register">here</Link>.
            </p>
            <TextField label="Email" name="email" />
            <TextField label="Password" name="password" type="password" />
            <Button variant="contained" name="password" type="submit">
                Login
            </Button>
        </Form>
    );
}
