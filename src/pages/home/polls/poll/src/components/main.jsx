import React from "react";
import PollModule from "./PollModule";

export default function Poll() {
    const poll = {
        title: "Should we add a poll feature?",
        id: "c5551770-973b-4505-b16e-d12d96fb5aff",
        upvotes: ["0ec82961-331c-4792-b6b0-75e8b0b974ff"],
        content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };

    return <PollModule poll={poll} />;
}
