import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ToggleButtonGroup, ToggleButton, Button } from "@mui/material";
import "../poll.css";
import Poll from "../../../../../../util/sdk/poll";
import { requireSession } from "../../../../../../util/session";

/**
 * Upvote a post
 * @param {*} pollId
 */
const upvote = (pollId, setVote, vote) => {
    if (vote === "support") return;
    Poll.upvote(pollId).catch();
};

/**
 * Downvote a post
 * @param {*} pollId
 */
const downvote = (pollId, setVote, vote) => {
    if (vote === "reject") return;
    Poll.downvote(pollId).catch();
};

/**
 * Determines what the user voted for
 *
 * @param {Object} poll poll object
 * @returns {String | null} support or reject or null
 */
const userVote = (poll) => {
    const userId = requireSession();

    // check if upvote or downvote
    if (poll?.upvotes?.includes(userId)) return "support";
    if (poll?.downvotes?.includes(userId)) return "reject";

    // otherwise return null
    return null;
};

export default function PollModule({ poll, onChange }) {
    const [vote, setVote] = useState(userVote(poll));

    useEffect(() => {
        if (onChange && !!vote) onChange(vote);
    }, [vote]);

    return (
        <div className="poll-module">
            <h1>{poll.title}</h1>
            <p>{poll.content}</p>
            <div className="button-bar">
                <ToggleButtonGroup
                    value={vote}
                    onChange={(e, v) => setVote(v ?? vote)}
                    exclusive
                >
                    <ToggleButton
                        color="error"
                        value="reject"
                        onClick={() => downvote(poll.id, setVote, vote)}
                    >
                        Reject
                    </ToggleButton>
                    <ToggleButton
                        color="success"
                        value="support"
                        onClick={() => upvote(poll.id, setVote, vote)}
                    >
                        Support
                    </ToggleButton>
                </ToggleButtonGroup>
                <Button>Share</Button>
            </div>
        </div>
    );
}

PollModule.propTypes = {
    poll: PropTypes.shape({
        upvotes: PropTypes.arrayOf(PropTypes.string),
        downvotes: PropTypes.arrayOf(PropTypes.string),
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func,
};
