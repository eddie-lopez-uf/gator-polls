import React from "react";
import "../access.css";
import { Outlet } from "react-router-dom";
import logo from "../../../../assets/logo.svg";

export default function AccessPage() {
    return (
        <div className="access-page">
            <div className="access-img" />
            <div className="access-form">
                <img src={logo} alt="Gator Polls" height="80px" />
                <Outlet />
            </div>
        </div>
    );
}
