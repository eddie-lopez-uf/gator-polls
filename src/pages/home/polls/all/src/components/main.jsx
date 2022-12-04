import React from "react";
import { useLoaderData } from "react-router-dom";
import Feed from "../../../../src/components/Feed";

export default function AllPage() {
    const loaderData = useLoaderData();

    return (
        <div className="all-polls">
            <Feed polls={loaderData.polls} title="All Polls" />
        </div>
    );
}
