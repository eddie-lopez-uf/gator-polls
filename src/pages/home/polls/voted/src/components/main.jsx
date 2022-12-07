import React from "react";
import { useLoaderData } from "react-router-dom";
import Feed from "../../../../src/components/Feed";

export default function VotedPage() {
    const loaderData = useLoaderData();

    return (
        <div className="voted-polls">
            <Feed polls={loaderData.polls ?? []} title="Voted Polls" />
        </div>
    );
}
