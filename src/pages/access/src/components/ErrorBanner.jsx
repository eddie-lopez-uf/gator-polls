import React from "react";
import PropTypes from "prop-types";
import { Alert } from "@mui/material";

export default function ErrorBanner({ actionData }) {
    const renderBanner = !!actionData?.formError;
    return renderBanner ? (
        <Alert severity="error">{actionData?.formError}</Alert>
    ) : null;
}

ErrorBanner.propTypes = {
    actionData: PropTypes.shape({ formError: PropTypes.string }),
};
