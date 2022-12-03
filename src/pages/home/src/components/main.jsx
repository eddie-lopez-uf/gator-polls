import React from "react";
import { Paper, Button } from "@mui/material";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../../../assets/logo.svg";
import "../homepage.css";

export default function HomePage() {
    return (
        <div id="home">
            <Paper id="home-module">
                <div id="navigation">
                    <Link to="/" className="navigation-button">
                        <div id="logo">
                            <img src={logo} alt="Gator Polls" height="60px" />
                            <h1>Gator Polls</h1>
                        </div>
                    </Link>
                    <div className="navigation-section">
                        <NavLink to="/polls/your" className="navigation-button">
                            <Button>Your Polls</Button>
                        </NavLink>
                        <NavLink
                            to="/polls/create"
                            className="navigation-button"
                        >
                            <Button>Create Poll</Button>
                        </NavLink>
                        <NavLink
                            to="/polls/voted"
                            className="navigation-button"
                        >
                            <Button>View Voted</Button>
                        </NavLink>
                        <Link to="/access/logout" className="navigation-button">
                            <Button variant="contained">Log out</Button>
                        </Link>
                    </div>
                </div>
                <Outlet />
            </Paper>
        </div>
    );
}
