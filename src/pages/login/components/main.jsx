import React from "react";
import "../login.css";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";

export default function LoginPage() {
    return (
        <form>
            <img src={logo} alt="Gator Polls" height="80px" />
            <h2>Login</h2>
            <p>
                Don&apos;t have an account? Register{" "}
                <Link to="register">here</Link>.
            </p>
            <TextField label="Email" />
            <TextField label="Password" type="password" />
            <Button variant="contained">Login</Button>
        </form>
    );
}
