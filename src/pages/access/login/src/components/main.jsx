import React from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <form>
            <h2>Login</h2>
            <p>
                Don&apos;t have an account? Register{" "}
                <Link to="/access/register">here</Link>.
            </p>
            <TextField label="Email" />
            <TextField label="Password" type="password" />
            <Button variant="contained">Login</Button>
        </form>
    );
}
