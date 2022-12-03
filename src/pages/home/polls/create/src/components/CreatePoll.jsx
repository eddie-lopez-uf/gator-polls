import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Form, useActionData, useLoaderData } from "react-router-dom";
import "../create.css";
import ErrorBanner from "../../../../src/components/ErrorBanner";

export default function CreatePoll() {
    const actionData = useActionData();
    const loaderData = useLoaderData();

    // errors
    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const onTitleChange = (e) => {
        if (!e.target.value) {
            setTitleError("Title is required");
        } else {
            setTitleError("");
        }
    };

    const onContentChange = (e) => {
        if (!e.target.value) {
            setContentError("Content is required");
        } else {
            setContentError("");
        }
    };

    return (
        <div className="creation-module">
            <ErrorBanner actionData={actionData} />
            <h2>Create Poll</h2>
            <Form method="post">
                <input
                    type="hidden"
                    aria-hidden
                    name="author"
                    value={loaderData?.user?.fullName}
                />
                <input
                    type="hidden"
                    aria-hidden
                    name="authorEmail"
                    value={loaderData?.user?.email}
                />
                <TextField
                    name="title"
                    variant="standard"
                    label="Title"
                    onChange={onTitleChange}
                    error={
                        !!actionData?.fieldErrors?.title?.length ||
                        !!titleError.length
                    }
                    helperText={actionData?.fieldErrors?.title ?? titleError}
                />
                <TextField
                    name="content"
                    multiline
                    minRows={3}
                    label="Description"
                    onChange={onContentChange}
                    error={
                        !!actionData?.fieldErrors?.content?.length ||
                        !!contentError?.length
                    }
                    helperText={
                        actionData?.fieldErrors?.content ?? contentError
                    }
                />
                <Button type="submit" variant="contained">
                    Save Poll
                </Button>
            </Form>
        </div>
    );
}
