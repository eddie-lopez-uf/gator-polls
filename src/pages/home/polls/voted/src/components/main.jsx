import React from "react";
import { useLoaderData } from "react-router-dom";
import Feed from "../../../../src/components/Feed";

export default function AllPage() {
    const loaderData = useLoaderData();
    // eslint-disable-next-line no-console
    console.log(loaderData);

    return (
        <div className="voted-polls">
            <Feed polls={loaderData.polls ?? []} />
        </div>
    );
}
