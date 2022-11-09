import React, { useState } from "react";
import { Button, Card, TextField } from "@mui/material";
import "../create.css";

export default function CreatePoll() {
    // data
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // errors
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!title.length) {
            setTitleError("Title is required");
        }

        if (!content.length) {
            setContentError("Content is required");
        }
    };

    const onTitleChange = (e) => {
        setTitle(e.target.value);

        if (!e.target.value) {
            setTitleError("Title is required");
        } else {
            setTitleError("");
        }
    };

    const onContentChange = (e) => {
        setContent(e.target.value);

        if (!e.target.value) {
            setContentError("Content is required");
        } else {
            setContentError("");
        }
    };

    return (
        <Card className="creation-module">
            <h1>Create Poll</h1>
            <form onSubmit={onSubmit}>
                <TextField
                    variant="standard"
                    label="Title"
                    onChange={onTitleChange}
                    error={!!titleError.length}
                    helperText={titleError}
                />
                <TextField
                    multiline
                    minRows={3}
                    label="Description"
                    onChange={onContentChange}
                    error={!!contentError.length}
                    helperText={contentError}
                />
                <Button type="submit" variant="contained">
                    Save Poll
                </Button>
            </form>
        </Card>
    );
}
