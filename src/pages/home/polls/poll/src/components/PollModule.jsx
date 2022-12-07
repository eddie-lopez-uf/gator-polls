/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    ToggleButtonGroup,
    ToggleButton,
    Button,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import "../poll.css";
import Poll from "../../../../../../util/sdk/poll";
import { requireSession } from "../../../../../../util/session";

/**
 * Upvote a post
 * @param {*} pollId
 */
const upvote = (pollId, voteAnonymously, vote) => {
    if (vote === "support") return;
    Poll.upvote(pollId, voteAnonymously).catch();
};

/**
 * Downvote a post
 * @param {*} pollId
 */
const downvote = (pollId, voteAnonymously, vote) => {
    if (vote === "reject") return;
    Poll.downvote(pollId, voteAnonymously).catch();
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
    if (poll?.upvotes?.some((vote) => vote.userId === userId)) return "support";
    if (poll?.downvotes?.some((vote) => vote.userId === userId))
        return "reject";

    // otherwise return null
    return null;
};

/**
 * Will copy the poll link to the clipboard
 *
 * @param {Object} poll poll object
 */
const onShare = (poll) => {
    const url = `${window.location.origin}/polls/${poll.id}`;
    navigator.clipboard.writeText(url);
    // eslint-disable-next-line no-alert
    window.alert("Copied share link to clipboard");
};

/**
 * Will copy petition to clipboard
 *
 * @param {Object} poll poll object
 */
const copyPetition = (poll) => {
    Poll.fetchUpvotes(poll)
        .then((users) => {
            // get anonymous users
            const anonymousVoters = poll.upvotes.length - users.length;

            // get the petition voters
            let petitionVoters = "";
            users.forEach((user) => {
                petitionVoters += `- ${user.fullName} (${user.email})\n`;
            });

            // add anonymous voters in their own section
            petitionVoters +=
                anonymousVoters > 0
                    ? `- ${anonymousVoters} verified anonymous voters\n`
                    : "";

            const petition =
                // eslint-disable-next-line prefer-template
                "To whoever it may concert,\n\n" +
                "I am writing to you because I am concerned about " +
                poll.title +
                ".\n\n" +
                // eslint-disable-next-line quotes
                'This is how I described the problem on Gator Polls: "' +
                poll.content +
                // eslint-disable-next-line quotes
                '"\n\n' +
                "I would like to see something done about this issue, and the following agree:" +
                "\n\n" +
                petitionVoters +
                "\n" +
                "Thank you for your time,\n\n" +
                "Sincerely,\n" +
                "UF Student & Faculty\n\n " +
                "For more information, please visit: " +
                window.location.origin +
                "/polls/" +
                poll.id;

            navigator.clipboard.writeText(petition);
        })
        // eslint-disable-next-line no-alert
        .then(() => window.alert("Copied petition to clipboard"))
        // eslint-disable-next-line no-alert
        .catch(() => window.alert("Failed to copy petition to clipboard"));
};

export default function PollModule({ poll, onChange, isYours }) {
    // state
    const [vote, setVote] = useState(userVote(poll));
    const [firstChange, setChange] = useState(false);
    const [voteAnonymously, setVoteAnonymously] = useState(false);
    const [supportCount, setSupportCount] = useState(
        vote === "support"
            ? (poll?.upvotes?.length ?? 1) - 1
            : (poll?.upvotes?.length ?? 1) + 1
    );
    const [rejectCount, setRejectCount] = useState(
        vote === "reject"
            ? (poll?.downvotes?.length ?? 1) - 1
            : (poll?.downvotes?.length ?? 1) + 1
    );

    // get user id
    useEffect(() => {
        // handles immediate vote change
        if (vote === "support") {
            if (userVote(poll) !== null || firstChange) {
                setRejectCount(rejectCount - 1);
            }
            setSupportCount(supportCount + 1);
            if (!firstChange) setChange(true);
        } else if (vote === "reject") {
            if (userVote(poll) !== null || firstChange) {
                setSupportCount(supportCount - 1);
            }
            setRejectCount(rejectCount + 1);
            if (!firstChange) setChange(true);
        } else {
            setRejectCount(rejectCount - 1);
            setSupportCount(supportCount - 1);
        }

        if (onChange && !!vote) onChange(vote);
    }, [vote]);

    return (
        <div className="poll-module">
            <div className="poll-header-section">
                <h1>{poll.title}</h1>
                <FormControlLabel
                    label="Vote Anonymously"
                    labelPlacement="start"
                    control={
                        <Checkbox
                            aria-label="Vote Anonymously"
                            checked={voteAnonymously}
                            onChange={() =>
                                setVoteAnonymously(!voteAnonymously)
                            }
                        />
                    }
                />
            </div>
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
                        // onClick={() => downvote(poll.id, voteAnonymously, vote)}
                    >
                        Reject ({rejectCount})
                    </ToggleButton>
                    <ToggleButton
                        color="success"
                        value="support"
                        // onClick={() => upvote(poll.id, voteAnonymously, vote)}
                    >
                        Support ({supportCount})
                    </ToggleButton>
                </ToggleButtonGroup>
                <div>
                    <Button onClick={() => onShare(poll)}>Share</Button>
                    {isYours && supportCount > 0 && (
                        <Button onClick={() => copyPetition(poll)}>
                            Copy Petition
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

PollModule.propTypes = {
    poll: PropTypes.shape({
        upvotes: PropTypes.arrayOf(
            PropTypes.shape({
                anonymous: PropTypes.bool,
                userId: PropTypes.string,
            })
        ),
        downvotes: PropTypes.arrayOf(
            PropTypes.shape({
                anonymous: PropTypes.bool,
                userId: PropTypes.string,
            })
        ),
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func,
    isYours: PropTypes.bool,
};
