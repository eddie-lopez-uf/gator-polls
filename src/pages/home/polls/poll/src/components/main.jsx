import React from "react";
import { useLoaderData } from "react-router-dom";
import PollModule from "./PollModule";
import ErrorBanner from "../../../../src/components/ErrorBanner";

export default function Poll() {
    const { poll, formError } = useLoaderData();

    return (
        <>
            <ErrorBanner actionData={{ formError }} />
            {!formError?.length ? <PollModule poll={poll} /> : null}
        </>
    );
}
