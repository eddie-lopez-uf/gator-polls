import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, ToggleButtonGroup, ToggleButton, Button } from "@mui/material";
import "../poll.css";

export default function PollModule({ title, content, onChange }) {
    const [vote, setVote] = useState(null);

    useEffect(() => {
        if (onChange && !!vote) onChange(vote);
    }, [vote]);

    return (
        <Card className="poll-module">
            <h1>{title}</h1>
            <p>{content}</p>
            <div className="button-bar">
                <ToggleButtonGroup
                    value={vote}
                    onChange={(e, v) => setVote(v ?? vote)}
                    exclusive
                >
                    <ToggleButton color="error" value="reject">
                        Reject
                    </ToggleButton>
                    <ToggleButton color="success" value="support">
                        Support
                    </ToggleButton>
                </ToggleButtonGroup>
                <Button>Share</Button>
            </div>
        </Card>
    );
}

PollModule.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};
